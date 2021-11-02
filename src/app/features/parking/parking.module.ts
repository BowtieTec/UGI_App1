import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParkingRoutingModule } from './parking-routing.module';
import { ParkingComponent } from './parking/parking.component';
import { NewParkingComponent } from './new-parking/new-parking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { StepOneComponent } from './new-parking/components/step-one/step-one.component';
import { StepTwoComponent } from './new-parking/components/step-two/step-two.component';
import { StepThreeComponent } from './new-parking/components/step-three/step-three.component';
import { StepFourComponent } from './new-parking/components/step-four/step-four.component';
import { StepFiveComponent } from './new-parking/components/step-five/step-five.component';
import { StepSixComponent } from './new-parking/components/step-six/step-six.component';
import { SharedModule } from '../../shared/shared.module';

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
  ],
  imports: [
    CommonModule,
    ParkingRoutingModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    SharedModule,
  ],
})
export class ParkingModule {}
