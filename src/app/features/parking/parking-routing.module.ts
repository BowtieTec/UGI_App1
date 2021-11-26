import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingComponent } from './parking/parking.component';
import { NewParkingComponent } from './new-parking/new-parking.component';

const routes: Routes = [
  { path: 'parkingToday', component: ParkingComponent, outlet: 'home' }, //List of parking today
  { path: '', component: NewParkingComponent, outlet: 'home' }, // New Parking
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingRoutingModule {}
