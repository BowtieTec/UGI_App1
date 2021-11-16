import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourtesyRoutingModule } from './courtesy-routing.module';
import { CourtesyComponent } from './courtesy/courtesy.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [CourtesyComponent],
  imports: [
    CommonModule,
    CourtesyRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class CourtesyModule {}
