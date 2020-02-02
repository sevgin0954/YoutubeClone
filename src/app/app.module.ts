import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services-singleton/jwt-interceptor.service';
import { SigninComponent } from './signin/signin.component';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { SharedModule } from './shared/shared.module';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { NavbarSideComponent } from './navbar-side/navbar-side.component';
import { CommentModule } from './comment/comment.module';
import { VideoMiniModule } from './video-mini/video-mini.module';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MostPopularComponent,
    SubscriptionsComponent,
    NavbarSideComponent,
    NavbarTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CommentModule,
    VideoMiniModule
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
