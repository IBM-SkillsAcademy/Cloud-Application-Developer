const tweets = [
  {
    text: 'RT @missnemmanuel: “Dracarys”',
    post_date: '2019-05-07T08:37:06.000Z'
  },
  {
    text:
      'RT @GameOfThrones: The Last of the Starks.\nWatch the Game Revealed for last night’s episode of #GameofThrones on @YouTube: https://t.co/PIE...',
    post_date: '2019-05-07T08:37:25.000Z'
  },
  {
    text:
      'The Last of the Starks.\nWatch the Game Revealed for last night’s episode of #GameofThrones on @YouTube:... https://t.co/7RoZgROGYN',
    post_date: '2019-05-06T14:42:00.000Z'
  },
  {
    text:
      'RT @GameOfThrones: News from Winterfell.\n\nThe latte that appeared in the episode was a mistake. \n\n#Daenerys had ordered an herbal tea. http...',
    post_date: '2019-05-07T08:37:34.000Z'
  },
  {
    text:
      'News from Winterfell.\n\nThe latte that appeared in the episode was a mistake. \n\n#Daenerys had ordered an herbal tea. https://t.co/ypowxGgQRl',
    post_date: '2019-05-06T20:47:30.000Z'
  },
  {
    text:
      'RT @GameOfThrones: The Last of the Starks.\nWatch the Game Revealed for last night’s episode of #GameofThrones on @YouTube: https://t.co/PIE...',
    post_date: '2019-05-07T08:37:52.000Z'
  },
  {
    text:
      'RT @RaleighRitchie: I know it hurts. But Somewhere in the multiverse 👑🌞🌴\n\n@missnemmanuel 🙌🏽 https://t.co/nP2vdYqkeH',
    post_date: '2019-05-07T13:48:12.000Z'
  },
  {
    text: '@GameOfThrones  🤦',
    post_date: '2019-05-07T13:50:22.000Z'
  },
  {
    text:
      '" the north wasn\'t as *Cold* as Jon abandoned his direwolf  " ❄\n\n#GameOfThrones \nGoodbye Ghost 💙🐺💔\n\nThis is so unfo... https://t.co/nF8SYdnSJa',
    post_date: '2019-05-07T13:48:48.000Z'
  },
  {
    text: 'RT @GameOfThrones: To #AryaStark, the Hero of Winterfell.',
    post_date: '2019-05-07T13:51:37.000Z'
  },
  {
    text: '@GameOfThrones I hope HBO never edits that out',
    post_date: '2019-05-07T13:55:24.000Z'
  },
  {
    text:
      'What an incredible episode last night of #GameOfThrones  Check out my Spoiler Review @GameOfThrones #TheLastoftheStarks #GOTS8E4 ➡️ https://youtu.be/pUC8bSiyzfQ',
    post_date: '2019-05-07T13:51:37.000Z'
  },
  {
    text: '@GameOfThrones The script is perfect!! ',
    post_date: '2019-05-07T14:05:00.000Z'
  },
  {
    text:
      'My latest TV review @CNET is the best I’ve ever tested. LG’s C9 OLED beat the best TVs of 2018 in my side-by-side comparisons. Thanks to @GameofThrones #BattleofWinterfell for the dark scene torture tests & @jetscott for the bright vacation photos. https://www.cnet.com/reviews/lg-oled65c9pua-review/ …',
    post_date: '2019-05-07T15:08:00.000Z'
  },
  {
    text:
      '@HBO @gameofthrones @kfcradio #got if there was such a thing as psychic reviews, no one that loves this show would be watching the final season. Loved S1-7. They f--ked up. ',
    post_date: '2019-05-06T12:05:00.000Z'
  },
  {
    text:
      "I feel like the @GameOfThrones haters this final season are people who resent how popular the show's become. No, it's not been the final season of #TheShield, but it's damn solid. Here's my review of last night's episode: https://thenicsperiment.blogspot.com/2019/05/game-of-thrones-last-of-starks.html … #GameofThronesSeason8",
    post_date: '2019-05-06T17:53:00.000Z'
  },
  {
    text:
      'Yeah @GameOfThrones after further review. We the people need you to re shoot the scene where Jon Ghosted Ghost. That shit ain’t happenin on our watch. Pet him and tell him he’s a good boy.',
    post_date: '2019-05-06T06:00:00.000Z'
  },
  {
    text:
      'This episode in review: - Sansa is a snitch. Really terrible. She’s got to die! - Jon abandons his loyal dire wolf, whom he’s suppose to be soul bonded with. Wtf! - Bran knows every single thing Cersei is doing yet doesn’t tell Dany the dragons are vulnerable.',
    post_date: '2019-05-05T22:35:00.000Z'
  },
  {
    text:
      'RT @GameOfThrones: Not today. \n@Maisie_Williams remembers her first day on set. #GameofThrones https://t.co/HFQgctlkcl',
    post_date: '2019-05-07T14:13:49.000Z'
  },
  {
    text:
      '@GameOfThrones the worst episode ever. childish lines, broken characters, no probabilities between the scenes and a... https://t.co/ThllNxCzt0',
    post_date: '2019-05-07T16:25:49.000Z'
  },
  {
    text:
      '@GameOfThrones Damm right it was a mistake it should have been a Bud light #nocornsyrup ',
    post_date: '2019-05-07T16:25:49.000Z'
  },
  {
    text:
      "@GameOfThrones You're joking...The whole episode was a mistake, not only a harmless latte",
    post_date: '2019-05-07T16:24:49.000Z'
  },
  {
    text:
      "@united So, was just told I couldn't use an RPE, paid with cash for the upgrade. Then was told there is no upgrade. After paying. Wtf?",
    post_date: '2017-06-08T22:37:52.844Z'
  },
  {
    text:
      '@united would be great if you were more communicative about what is happening instead of watching your employees laugh at the gate',
    post_date: '2017-09-08T22:37:52.844Z'
  },
  {
    text:
      'Colgate and #Cowshed? nice case, but that makes for a subpar amenity kit @united https://t.co/Ljmv0GwSSy so many better products out there!',
    post_date: '2017-09-08T22:37:52.844Z'
  },
  {
    text:
      'Lessons to learn from @united: be more responsive and personable in social media responses #SloanieReunion',
    post_date: '2017-06-08T22:37:52.844Z'
  },
  {
    text: '@JetBlue Fligth 462 SJU - BOS the worst service in my life',
    post_date: '2017-09-08T22:37:52.844Z'
  },
  {
    text: 'You would think they learned their lesson https://t.co/wGnGTv1pgB',
    post_date: '2017-06-08T22:37:52.844Z'
  },
  {
    text:
      "@Dawnkubik @Gerjersey @JLaValle @united Dawn if you live in NJ and fly 200k miles a year there aren't many options https://t.co/U0ZLHhR3k2",
    post_date: '2017-06-08T22:37:52.844Z'
  },
  {
    text:
      'This &amp; many other reasons are why I cashed in my miles &amp; stopped flying @united airlines. Do you hire anyone with b https://t.co/bWLEDEphD6',
    post_date: '2017-06-08T22:37:52.844Z'
  }
];

export default tweets;
