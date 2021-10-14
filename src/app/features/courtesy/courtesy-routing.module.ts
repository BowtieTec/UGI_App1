import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourtesyComponent } from './courtesy/courtesy.component';

const routes: Routes = [
  { path: '', component: CourtesyComponent, outlet: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourtesyRoutingModule {}
