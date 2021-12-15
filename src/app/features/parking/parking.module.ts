import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingComponent } from './components/parking/parking.component';
import { NewParkingComponent } from './components/new-parking/new-parking.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { GeneralDataComponent } from './components/new-parking/components/general-data/general-data.component';
import { ScheduleComponent } from './components/new-parking/components/schedule/schedule.component';
import { TariffComponent } from './components/new-parking/components/tariff/tariff.component';
import { BillingDataComponent } from './components/new-parking/components/billing-data/billing-data.component';
import { AntennasComponent } from './components/antennas/antennas.component';
import { ResumeComponent } from './components/new-parking/components/resume/resume.component';
import { SharedModule } from '../../shared/shared.module';
import {
  NgbDatepickerModule,
  NgbModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ParkingMenuComponent } from './parking-menu.component';
import { MonthlyParkingComponent } from './components/monthly-parking/monthly-parking.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    ParkingComponent,
    NewParkingComponent,
    GeneralDataComponent,
    ScheduleComponent,
    TariffComponent,
    BillingDataComponent,
    AntennasComponent,
    ResumeComponent,
    ParkingMenuComponent,
    MonthlyParkingComponent,
  ],
  imports: [
    CommonModule,
    ParkingRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    SharedModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgbModule,
    FormsModule,
    DataTablesModule,
  ],
  providers: [DatePipe, CurrencyPipe],
})
export class ParkingModule {}
