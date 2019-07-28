import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import config from './config';
import { errorHandler } from './middleware/ErrorHandler';
import { MiddleWare } from './middleware/MiddleWare';
import { AnalysisRoute } from './routes/AnalysisRoute';
import { TweeterRoute } from './routes/TweeterRoute';
import { TweeterListener } from './service/TweeterListener';
import logger from './util/Logger';
import { EnrichmentPipeline } from './util/EnrichmentPipeline';
import { CloudantDAO } from './dao/CloudantDAO';
import cfEnv from 'cfenv';
import express_enforces_ssl from 'express-enforces-ssl';

const appID = require('ibmcloud-appid');
const WebAppStrategy = appID.WebAppStrategy;
const userProfileManager = appID.UserProfileManager;
const isLocal = cfEnv.getAppEnv().isLocal;

const LOGIN_URL = '/auth/login';
const CALLBACK_URL = '/ibm/bluemix/appid/callback';

const UI_BASE_URL = config.uiBaseUrl;

//Loading appId configurations from config file
const appIdConfig = getLocalConfig();

const app = express();
app.use(MiddleWare.appMiddleware(app));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler);

//Important in development mode:
// Use cors to add "Allow-Access-Origin" header in requests and responses to Angular server
app.use(cors({ credentials: true, origin: UI_BASE_URL }));

//configure security on express app
configureSecurity();

//Setup express application to use express-session middleware
// Must be configured with proper session storage for production
// environments. See https://github.com/expressjs/session for
// additional documentation
app.use(
  session({
    secret: 'keyboardcat',
    resave: true,
    saveUninitialized: true,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: !isLocal,
      maxAge: 600000000
    }
  })
);

// Configure express application to use passportjs
app.use(passport.initialize());
app.use(passport.session());

let webAppStrategy = new WebAppStrategy(appIdConfig);
passport.use(webAppStrategy);

userProfileManager.init(appIdConfig);

// Configure passportjs with user serialization/deserialization. This is required
// for authenticated session persistence accross HTTP requests. See passportjs docs
// for additional information http://passportjs.org/docs
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

//Gets App ID credentials from configuration file for local environment
function getLocalConfig() {
  if (!isLocal) {
    return;
  }
  let appIdConfig = {
    clientId: config.appIdClientId,
    tenantId: config.appIdTenantId,
    secret: config.appIdSecret,
    oauthServerUrl: config.appIdOauthServerUrl,
    profilesUrl: config.appIdProfilesUrl,
    version: 0,
    redirectUri: `http://localhost:${config.port}${CALLBACK_URL}`,
    appidServiceEndpoint: ''
  };

  if (config.appIdVersion) {
    appIdConfig.version = config.appIdVersion;
  }

  if (config.appidServiceEndpoint) {
    appIdConfig.appidServiceEndpoint = config.appidServiceEndpoint;
  }
  return appIdConfig;
}

// start listener

//configure the security on the express app
function configureSecurity() {
  app.use(helmet());
  app.use(cookieParser());
  app.use(helmet.noCache());
  app.enable('trust proxy');
  if (!isLocal) {
    app.use(express_enforces_ssl());
  }
}

// //starts listening to new tweets
// function tweeterListenerStart() {}

function tweeterListenerStart() {
  let tweeterListener;
  let cloudantDAO;

  const twitOptions = {};
  twitOptions.max = -1;

  // initialize enrichment pipeline to analyze the tweets
  const enrichmentPipeline = EnrichmentPipeline.getInstance();
  // app level initialization
  const cloudantOptions = {};
  cloudantOptions.maxBufferSize = config.max_buffer_size;

  // initialize cloudant dao to save the analyzed tweets
  cloudantDAO = CloudantDAO.getInstance(cloudantOptions, enrichmentPipeline);
  // setup the database once the enrichment pipeline has been initialized.
  cloudantDAO
    .setupCloudant()
    .then(() => {
      tweeterListener = TweeterListener.getInstance(
        twitOptions,
        enrichmentPipeline
      );
      // Make sure first user ids are set if LISTEN_TO flag is set.
      tweeterListener
        .init()
        .then(() => {
          tweeterListener.startListener();
        })
        .catch(err => {
          logger.error(err);
        });

      // send the enrichmentPipeline and cloudantDAO instances to the routes function, to be used by the routes in it.
      routes(enrichmentPipeline, cloudantDAO);
    })
    .catch(error => {
      logger.error(error);
      process.exit(1);
    });
}

//middleware that checks the app Id cookie in request session,
//if found, then proceed to the protected resource
//if not found, redirects to the login page
function isLoggedIn(req, res, next) {
  console.log(JSON.stringify(req.session[WebAppStrategy.AUTH_CONTEXT]));
  if (req.session[WebAppStrategy.AUTH_CONTEXT]) {
    next();
  } else {
    res.redirect(UI_BASE_URL + '/');
  }
}

// express app routes
function routes(enrichmentPipeline, cloudantDAO) {
  //checks first if user is logged in, then get tweets from cloudant
  app.use('/tweets', isLoggedIn, new TweeterRoute(enrichmentPipeline).router);

  //parent route for analysis apis, it checks first if user is logged in, then redirects to the required analysis route
  app.use('/analysis', isLoggedIn, new AnalysisRoute(cloudantDAO).router);
}

//checks first if user is logged in,
// then gets sentiment of the tweets grouped by time from cloudant view
app.use('/analysis/sentimentOverTime', isLoggedIn);

//checks first if user is logged in,
//then gets the average sentiment of the tweets from cloudant view
app.use('/analysis/sentimentTrend', isLoggedIn);

//checks first if user is logged in,
//then gets sentiment summary from cloudant view
app.use('/analysis/sentimentSummary', isLoggedIn);

//checks first if user is logged in,
//then gets nlu keywords summary from cloudant view
app.use('/analysis/keywordsSummary', isLoggedIn);

//checks first if user is logged in,
//then gets nlu emotions grouped by time from cloudant view
app.use('/analysis/emotionalToneOvertime', isLoggedIn);

//checks first if user is logged in,
//then gets tweets sorted by posted date from cloudant view

//checks first if user is logged in,
//then gets the tweets listener status
app.use('/analysis/listByPostDate', isLoggedIn);
app.use('/tweets/status', isLoggedIn);

// Explicit login endpoint. Will always redirect browser to login widget due to {forceLogin: true}.
// If forceLogin is set to false redirect to login widget will not occur of already authenticated users.
// app.get(
//   LOGIN_URL,
//   passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
//     successRedirect: UI_BASE_URL + '/',
//     forceLogin: true
//   })
// );
app.get(
  LOGIN_URL,
  passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    forceLogin: true,
    successRedirect: UI_BASE_URL + '/'
  }),
  function(req, res) {
    //after user is logs in start listening to tweets
    tweeterListenerStart();
  }
);

// Explicit logout endpoint, logs out the user then redirects to the login page.
app.get('/auth/logout', function(req, res, next) {
  WebAppStrategy.logout(req);
  res.redirect(UI_BASE_URL + '/');
});

//checks is the user is logged in, and returns the user session.
app.get('/auth/logged', (req, res) => {
  let loggedInAs = {};
  if (req.session[WebAppStrategy.AUTH_CONTEXT]) {
    loggedInAs['name'] = req.user.name;
    loggedInAs['email'] = req.user.email;

    //if user is logged in start listening to tweets
    tweeterListenerStart();
  }

  res.send({
    logged: req.session[WebAppStrategy.AUTH_CONTEXT] ? true : false,
    loggedInAs: loggedInAs
  });
});

// Callback to finish the authorization process. Will retrieve access and identity tokens/
// from AppID service and redirect to either (in below order)
// 1. the original URL of the request that triggered authentication, as persisted in HTTP session under WebAppStrategy.ORIGINAL_URL key.
// 2. successRedirect as specified in passport.authenticate(name, {successRedirect: "...."}) invocation
// 3. application root ("/")
app.get(
  CALLBACK_URL,
  passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    allowAnonymousLogin: true
  })
);
export default app;
