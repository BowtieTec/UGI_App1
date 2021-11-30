import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingComponent } from './components/parking/parking.component';
import { NewParkingComponent } from './components/new-parking/new-parking.component';
import { ParkingMenuComponent } from './parking-menu.component';

const routes: Routes = [
  { path: 'parkingToday', component: ParkingComponent, outlet: 'home' }, //List of parking today
  { path: '¨newParking', component: NewParkingComponent, outlet: 'home' }, // New Parking
  { path: '', component: ParkingMenuComponent, outlet: 'home' }, // New Parking
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingRoutingModule {}
