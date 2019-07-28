import { Component, OnInit } from '@angular/core';
import { AuthService, UserState } from '../../service/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cloudland-home',
  templateUrl: './auth.component.html',
  providers: []
})
export class AuthComponent implements OnInit {
  constructor(private authService: AuthService) {}

  userState: UserState;
  cloudLandRewardPoints: number;
  apiurl: string;

  ngOnInit() {
    this.getUserInfo();
    this.apiurl = environment.api_url;
  }

  getUserInfo() {
    this.authService
      .isAuthenticated()
      .subscribe(user => (this.userState = user));
  }
}
