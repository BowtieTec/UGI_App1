import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report/report.component';
import { CashOutReportComponent } from './cash-out-report/cash-out-report.component';

@NgModule({
  declarations: [ReportComponent, CashOutReportComponent],
  imports: [CommonModule, ReportRoutingModule],
})
export class ReportModule {}
