import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

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
      }

    }
    else {
      window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=576498499876-u841pl14j9pdgemtlaqk1a6tjih8vb2c.apps.googleusercontent.com&' + 'redirect_uri=http://localhost:4200/signin&' +
      'response_type=token&' +
      'scope=https://www.googleapis.com/auth/youtube.readonly';
    }
  }

}
