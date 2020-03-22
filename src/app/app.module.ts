import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommentModule } from './comment/comment.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services-singleton/interceptors/jwt-interceptor.service';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { SharedModule } from './shared/shared.module';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { VideoMiniModule } from './video-mini/video-mini.module';
import { NavbarModule } from './navbar/navbar.module';

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
    NavbarModule
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
