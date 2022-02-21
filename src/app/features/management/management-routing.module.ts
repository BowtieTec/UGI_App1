import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ManagementMenuComponent } from './management-menu.component'

const routes: Routes = [
  {
    path: '',
    component: ManagementMenuComponent,
    outlet: 'home'
    /*children: [
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./components/users/users.module').then(
                (x) => x.UsersModule
              ),
          },
        ],
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./components/roles/roles.module').then(
                (x) => x.RolesModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: 'option/users',
      },
    ],*/
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule {}
