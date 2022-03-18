import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTicketComponent } from './components/new-ticket/new-ticket.component';
import { SupportMenuComponent } from './components/support-menu/support-menu.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { SupportRoutingModule } from './support-routing.module';



@NgModule({
  declarations: [
    
    NewTicketComponent,
    SupportMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
