import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomPreloading } from './custom-preloading';
import { RouteConstants } from './shared/constants/route-constants';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trending' },
//------------------------------------------------------------------------------------------
  { path: 'trending',
      loadChildren: () => import('./landing/landing.module')
      .then(m => m.LandingModule) },
//------------------------------------------------------------------------------------------
  { path: RouteConstants.SEARCH,
      loadChildren: () => import('./search/search.module')
      .then(m => m.SearchModule) },
//------------------------------------------------------------------------------------------
  { path: 'signin',
      loadChildren: () => import('./authentication/authentication.module')
      .then(m => m.AuthenticationModule) },
//------------------------------------------------------------------------------------------
  { path: 'subscriptions', loadChildren: () => import('./subscriptions/subscriptions.module')
    .then(m => m.SubscriptionsModule) },
//------------------------------------------------------------------------------------------
  { path: 'video',
      loadChildren: () => import('./video/video.module')
      .then(m => m.VideoModule), data: { preload: true } },
//------------------------------------------------------------------------------------------
  { path: 'channel',
      loadChildren: () => import('./channel/channel.module')
      .then(m => m.ChannelModule) },
//------------------------------------------------------------------------------------------
  { path: 'categories',
      loadChildren: () => import('./category/category.module')
      .then(m => m.CategoryModule) },
//------------------------------------------------------------------------------------------
  { path: 'category',
      loadChildren: () => import('./category/category.module')
      .then(m => m.CategoryModule) }
//------------------------------------------------------------------------------------------
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
