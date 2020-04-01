import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentModule } from './comment/comment.module';
import { JwtInterceptorService } from './services-singleton/interceptors/jwt-interceptor.service';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { SharedModule } from './shared/shared.module';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { VideoMiniModule } from './video-mini/video-mini.module';
import { NavbarModule } from './navbar/navbar.module';
import { VideoModule } from './video/video.module';
import { TextModule } from './text/text.module';

@NgModule({
  declarations: [
    AppComponent,
    SubscriptionsComponent,
    MostPopularComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommentModule,
    HttpClientModule,
    SharedModule,
    VideoMiniModule,
    NavbarModule,
    VideoModule,
    TextModule
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
