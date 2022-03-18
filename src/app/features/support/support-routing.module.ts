import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SupportMenuComponent } from './components/support-menu/support-menu.component';

const routes: Routes = [
  {
    path: '',
    component: SupportMenuComponent,
    outlet: 'home'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)  ],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
