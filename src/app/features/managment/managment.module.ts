import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagmentRoutingModule } from './managment-routing.module';
import { ManagmentComponent } from './managment/managment.component';
import { ResgisteredUsersComponent } from './resgistered-users/resgistered-users.component';
import { NewUserComponent } from './new-user/new-user.component';


@NgModule({
  declarations: [
    ManagmentComponent,
    ResgisteredUsersComponent,
    NewUserComponent
  ],
  imports: [
    CommonModule,
    ManagmentRoutingModule
  ]
})
export class ManagmentModule { }
