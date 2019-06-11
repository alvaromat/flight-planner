import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

const MATERIAL_MODULES = [
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatRadioModule
];

const SHARED_MODULES = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  ...MATERIAL_MODULES,
];

@NgModule({
  declarations: [],
  imports: [
    SHARED_MODULES
  ],
  exports: [
    SHARED_MODULES
  ]
})
export class SharedModule { }
