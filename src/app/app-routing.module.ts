import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MostPopularComponent } from './most-popular/most-popular.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { CustomPreloading } from './custom-preloading';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trending' },
  { path: 'trending', component: MostPopularComponent },
  { path: 'signin', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'subscriptions', component: SubscriptionsComponent },
  { path: 'video', loadChildren: () => import('./video/video.module').then(m => m.VideoModule), data: { preload: true } },
  { path: 'channel', loadChildren: () => import('./channel/channel.module').then(m => m.ChannelModule) },
  { path: 'categories', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) },
  { path: 'category', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule) }
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
