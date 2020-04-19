import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services-singleton/auth.service';
import { SecurityConstants } from 'src/app/shared/constants/security-constants';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    const url = location.href;
    const oAuthQuery = url.split('#')[1];
    if (oAuthQuery) {
      const isError = oAuthQuery.indexOf('error') >= 0;
      if (isError === true) {
        // TODO: Handle error
      }
      else {
        const queryParts = oAuthQuery.split('&');
        const tokenPart = queryParts.find(qp => qp.indexOf('access_token') >= 0);
        const token = tokenPart.split('=')[1];

        this.authService.setToken(token);
        this.router.navigate(['']);
      }

    }
    else {
      const baseUrl = window.location.origin;

      window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?' +
      `client_id=${SecurityConstants.YOUTUBE_CLIENT_ID}&` +
      `redirect_uri=${baseUrl}/signin&` +
      'response_type=token&' +
      'scope=' +
      'https://www.googleapis.com/auth/youtube.readonly ' +
      'https://www.googleapis.com/auth/youtube.upload ' +
      'https://www.googleapis.com/auth/youtube.force-ssl ' +
      'https://www.googleapis.com/auth/youtubepartner';
    }
  }

}
