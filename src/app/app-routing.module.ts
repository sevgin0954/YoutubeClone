import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostPopularComponent } from './most-popular/most-popular.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { CustomPreloading } from './custom-preloading';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trending' },
  { path: 'trending', component: MostPopularComponent },
  { path: 'signin', loadChildren: './authentication/authentication.module#AuthenticationModule' },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'video', loadChildren: './video/video.module#VideoModule', data: { preload: true } },
  { path: 'channel', loadChildren: './channel/channel.module#ChannelModule' },
  { path: 'categories', loadChildren: './category/category.module#CategoryModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    preloadingStrategy: CustomPreloading
  })],
  providers: [
    CustomPreloading
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
