import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentModule } from './comment/comment.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services-singleton/jwt-interceptor.service';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { SharedModule } from './shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { VideoMiniModule } from './video-mini/video-mini.module';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SubscriptionsComponent,
    MostPopularComponent,
    NavbarSideComponent,
    NavbarTopComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommentModule,
    HttpClientModule,
    SharedModule,
    VideoMiniModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
