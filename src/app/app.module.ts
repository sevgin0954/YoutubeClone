import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptorService } from './services-singleton/jwt-interceptor.service';
import { SigninComponent } from './signin/signin.component';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { NavbarTopComponent } from './navbar-top/navbar-top.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { NavbarSideComponent } from './navbar-side/navbar-side.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    MostPopularComponent,
    NavbarTopComponent,
    NavbarSideComponent,
    SubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
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
