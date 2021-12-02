import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkingMenuComponent } from './parking-menu.component';
import {MonthlyParkingComponent} from "./components/monthly-parking/monthly-parking.component";

const routes: Routes = [
  { path: 'menu', component: ParkingMenuComponent, outlet: 'home' }, // Menu Parkin
  { path: '', component: MonthlyParkingComponent, outlet: 'home' }, // Monthly Parking
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingRoutingModule {}
