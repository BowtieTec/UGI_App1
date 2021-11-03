import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'management',
        loadChildren: () =>
          import('../management/management.module').then(
            (m) => m.ManagementModule
          ),
      },
      {
        path: 'parking',
        loadChildren: () =>
          import('../parking/parking.module').then((m) => m.ParkingModule),
      },
      {
        path: 'courtesy',
        loadChildren: () =>
          import('../courtesy/courtesy.module').then((m) => m.CourtesyModule),
      },
      {
        path: 'report',
        loadChildren: () =>
          import('../report/report.module').then((m) => m.ReportModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
