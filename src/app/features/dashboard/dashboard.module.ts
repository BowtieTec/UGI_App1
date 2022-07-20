import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'

import {DashboardRoutingModule} from './dashboard-routing.module'
import {DashboardComponent} from './dashboard/dashboard.component'
import {SharedModule} from '../../shared/shared.module'
import {NgApexchartsModule} from 'ng-apexcharts'
import {NgbDatepickerModule, NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import {TransitComponent} from './components/transit/transit.component';
import {CashFlowComponent} from './components/cash-flow/cash-flow.component';
import {CourtesiesComponent} from './components/courtesies/courtesies.component';
import {StationaryCourtesiesComponent} from './components/stationary-courtesies/stationary-courtesies.component'

@NgModule({
  declarations: [DashboardComponent, TransitComponent, CashFlowComponent, CourtesiesComponent, StationaryCourtesiesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgApexchartsModule,
    NgbNavModule,
    NgbDatepickerModule
  ]
})
export class DashboardModule {
}
