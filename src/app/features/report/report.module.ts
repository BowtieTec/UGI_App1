import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportMenuComponent } from './report-menu.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
//import { PaymentReportComponent } from './components/payment-report/payment-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { DiscountReportComponent } from './components/discount-report/discount-report.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { GeneralDataComponent } from '../parking/components/new-parking/components/general-data/general-data.component';
import {
  NgbDatepickerModule,
  NgbModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
//import { DurationReportComponent } from './components/duration-report/duration-report.component';
import { ParkingTicketReportComponent } from './components/parking-ticket-report/parking-ticket-report.component';
//import { ParkingMontlyReportComponent } from './components/parking-montly-report/parking-montly-report.component';
//import { ParkingDayReportComponent } from './components/parking-day-report/parking-day-report.component';
import { ReportService } from './components/service/report.service';

import { DxDataGridModule, DxButtonModule } from 'devextreme-angular';

import { DetailGridComponent } from './components/parking-ticket-report/detail/detail-grid.component';

@NgModule({
  declarations: [
    ReportMenuComponent,
    //PaymentReportComponent,
    //DiscountReportComponent,
    //DurationReportComponent,
    ParkingTicketReportComponent,
    //ParkingMontlyReportComponent,
    //ParkingDayReportComponent,
    DetailGridComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbPaginationModule,
    DataTablesModule,
    NgbNavModule,
    DxDataGridModule,
    DxButtonModule,
  ],
  providers:[ReportService],

})
export class ReportModule {}
