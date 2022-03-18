import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { RegisterPublicFormComponent } from './register-public-form/register-public-form.component'

const routes: Routes = [
  {
    path: 'registro',
    component: RegisterPublicFormComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule)
  },
  {
    path: '**',
    redirectTo: '/404'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
