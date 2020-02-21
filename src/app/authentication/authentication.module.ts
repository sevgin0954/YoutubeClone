import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SigninComponent } from './signin/signin.component';

const routes: Routes = [
  { path: '', component: SigninComponent }
];

@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
})
export class AuthenticationModule { }
