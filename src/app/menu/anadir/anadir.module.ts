import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AnadirPage } from './anadir.page';

const routes: Routes = [
  {
    path: '',
    component: AnadirPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AnadirPage]
})
export class AnadirPageModule { }
