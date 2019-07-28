import { Injectable, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  userState: UserState;
  uri = environment.api_url;
  constructor(private http: HttpClient) {}

  public isAuthenticated(): Observable<UserState> {
    if (typeof this.userState === 'undefined') {
      return this.checkAuthenticated().do(data => {
        this.userState = data;
      });
    } else {
      console.log(JSON.stringify(this.userState));
      return Observable.of(this.userState);
    }
  }

  private isLoggedUrl = this.uri + '/auth/logged';
  checkAuthenticated(): Observable<UserState> {
    return this.http.get<UserState>(this.isLoggedUrl, {
      withCredentials: true
    });
  }
}

export class UserState {
  logged: boolean;
  loggedInAs: {
    name: string;
    email: string;
  };
}
