import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { CashOutReportComponent } from './cash-out-report/cash-out-report.component';

const routes: Routes = [
  { path: '', component: ReportComponent, outlet: 'home' },
  { path: 'report', component: CashOutReportComponent, outlet: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
