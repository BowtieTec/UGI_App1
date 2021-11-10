import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementMenuComponent } from './management-menu/management-menu.component';

const routes: Routes = [
  {
    path: 'menu',
    component: ManagementMenuComponent,
    outlet: 'home',
  },
  {
    path: '',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
