import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { LocationPanelComponent } from './location-panel/location-panel.component';
import { CardKpiComponent } from './card-kpi/card-kpi.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LoadingComponent } from './loading/loading.component';
import { TimePipe } from './pipes/time.pipe';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    LeftPanelComponent,
    HeaderComponent,
    LocationPanelComponent,
    CardKpiComponent,
    BarChartComponent,
    LoadingComponent,
    TimePipe,
    FilterPipe,
  ],
  imports: [CommonModule, RouterModule, NgbPaginationModule],
  exports: [
    LeftPanelComponent,
    HeaderComponent,
    LocationPanelComponent,
    CardKpiComponent,
    BarChartComponent,
    LoadingComponent,
    TimePipe,
    FilterPipe,
  ],
})
export class SharedModule {}
