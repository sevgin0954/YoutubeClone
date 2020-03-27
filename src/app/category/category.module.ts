import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './services/categories.service';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';
import { CategoryVideoComponent } from './category-video/category-video.component';

const routes: Routes = [
  { path: ':id', component: CategoryVideoComponent },
  { path: '', pathMatch: 'full', component: CategoriesComponent },
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent,
    CategoryVideoComponent
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
