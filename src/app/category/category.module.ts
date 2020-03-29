import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './services/categories.service';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { CategoryVideosComponent } from './category-videos/category-videos.component';

const routes: Routes = [
  { path: ':id', component: CategoryVideosComponent },
  { path: '', pathMatch: 'full', component: CategoriesComponent },
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent,
    CategoryVideosComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  providers: [
    CategoriesService
  ]
})
export class CategoryModule { }
