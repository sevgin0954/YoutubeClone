import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  { path: ':categories', component: CategoriesComponent }
];

@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class CategoryModule { }
