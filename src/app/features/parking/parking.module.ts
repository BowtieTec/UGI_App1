import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingComponent } from './components/parking/parking.component';
import { NewParkingComponent } from './components/new-parking/new-parking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { StepOneComponent } from './components/new-parking/components/step-one/step-one.component';
import { StepTwoComponent } from './components/new-parking/components/step-two/step-two.component';
import { StepThreeComponent } from './components/new-parking/components/step-three/step-three.component';
import { StepFourComponent } from './components/new-parking/components/step-four/step-four.component';
import { StepFiveComponent } from './components/new-parking/components/step-five/step-five.component';
import { StepSixComponent } from './components/new-parking/components/step-six/step-six.component';
import { SharedModule } from '../../shared/shared.module';
import {
  NgbDatepickerModule,
  NgbModule,
  NgbTimepickerModule,
} from '@ng-bootstrap/ng-bootstrap';
import { ParkingMenuComponent } from './parking-menu.component';

@NgModule({
  declarations: [
    ParkingComponent,
    NewParkingComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepSixComponent,
    ParkingMenuComponent,
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
  ],
  providers: [DatePipe, CurrencyPipe],
})
export class ParkingModule {}
