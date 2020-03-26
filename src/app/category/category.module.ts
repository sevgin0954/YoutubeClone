import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { CategoriesService } from './services/categories.service';
import { SharedModule } from '../shared/shared.module';
import { CategoryComponent } from './category/category.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CategoriesComponent }
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryComponent
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
