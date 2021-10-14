import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourtesyRoutingModule } from './courtesy-routing.module';
import { CourtesyComponent } from './courtesy/courtesy.component';


@NgModule({
  declarations: [
    CourtesyComponent
  ],
  imports: [
    CommonModule,
    CourtesyRoutingModule
  ]
})
export class CourtesyModule { }
