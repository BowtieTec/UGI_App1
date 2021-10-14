import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { NewUserParkingComponent } from './new-user-parking/new-user-parking.component';
import { RegisteredUsersParkingComponent } from './registered-users-parking/registered-users-parking.component';

@NgModule({
  declarations: [UserComponent, NewUserParkingComponent, RegisteredUsersParkingComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
