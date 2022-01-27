import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManagementRoutingModule} from './management-routing.module';
import {ManagementMenuComponent} from './management-menu.component';
import {ResgisteredUsersComponent} from './components/users/components/resgistered-users/resgistered-users.component';
import {NewUserComponent} from './components/users/components/new-user/new-user.component';
import {UsersComponent} from './components/users/users.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbNavModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {RolesComponent} from './components/roles/roles.component';
import {CompanyComponent} from './components/companies/company/company.component';

@NgModule({
  declarations: [
    ManagementMenuComponent,
    ResgisteredUsersComponent,
    NewUserComponent,
    UsersComponent,
    RolesComponent,
    CompanyComponent,
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
    NgbNavModule,
  ],
})
export class ManagementModule {}
