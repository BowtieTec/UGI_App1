import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingComponent } from './parking/parking.component';
import { NewParkingComponent } from './new-parking/new-parking.component';
import { TariffComponent } from './tariff/tariff.component';

const routes: Routes = [
  { path: 'parkingToday', component: ParkingComponent, outlet: 'home' }, //List of parking today
  { path: 'new', component: NewParkingComponent, outlet: 'home' }, // New Parking
  { path: '', component: TariffComponent, outlet: 'home' }, //Tariff
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingRoutingModule {}
