import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementRoutingModule } from './management-routing.module';
import { ManagementMenuComponent } from './management-menu/management-menu.component';
import { ResgisteredUsersComponent } from './users/components/resgistered-users/resgistered-users.component';
import { NewUserComponent } from './users/components/new-user/new-user.component';
import { UsersComponent } from './users/users.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    ManagementMenuComponent,
    ResgisteredUsersComponent,
    NewUserComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    ManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    SharedModule,
    NgbPaginationModule,
    FormsModule,
    DataTablesModule,
  ],
})
export class ManagementModule {}
