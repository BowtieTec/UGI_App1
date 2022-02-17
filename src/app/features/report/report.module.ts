import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReportRoutingModule} from './report-routing.module';
import {ReportMenuComponent} from './report-menu.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {NgbNavModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {PaymentReportComponent} from './components/payment-report/payment-report.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CourtesyReportComponent} from './components/courtesy-report/courtesy-report.component';
import {CourtesyStationReportComponent} from './components/courtesy-station-report/courtesy-station-report.component';
import {DurationReportComponent} from './components/duration-report/duration-report.component';
import {ParkingTicketReportComponent} from './components/parking-ticket-report/parking-ticket-report.component';
import {ParkingMontlyReportComponent} from './components/parking-montly-report/parking-montly-report.component';
import {ParkingDayReportComponent} from './components/parking-day-report/parking-day-report.component';
import {ReportService} from './components/service/report.service';

import {DxButtonModule, DxDataGridModule} from 'devextreme-angular';

import {DetailGridComponent} from './components/parking-ticket-report/detail/detail-grid.component';
import {DetailGridMonthComponent} from './components/parking-day-report/detail/detail-grid-month.component';
import {ReportComponent} from "./report/report.component";

@NgModule({
  declarations: [
    ReportMenuComponent,
    PaymentReportComponent,
    CourtesyReportComponent,
    CourtesyStationReportComponent,
    DurationReportComponent,
    ParkingTicketReportComponent,
    ParkingMontlyReportComponent,
    ParkingDayReportComponent,
    DetailGridComponent,
    ReportComponent,
    DetailGridMonthComponent],
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
  providers: [ReportService],

})
export class ReportModule {
}
