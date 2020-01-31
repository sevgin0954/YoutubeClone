import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { MostPopularComponent } from './most-popular/most-popular.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trending' },
  { path: 'trending', component: MostPopularComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'video', loadChildren: './video/video.module#VideoModule' },
  { path: 'channel', loadChildren: './channel/channel.module#ChannelModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
