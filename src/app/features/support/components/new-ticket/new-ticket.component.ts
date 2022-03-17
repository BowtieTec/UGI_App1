import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseModel } from 'src/app/shared/model/Request.model';
import { AuthModel } from 'src/app/shared/model/UserResponse.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { PermissionsService } from 'src/app/shared/services/permissions.service';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { supportTicketModel } from './Models/support-ticket.module';
import { SupportTicketService } from './Services/support-ticket.service';


@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styleUrls: ['./new-ticket.component.css']
})
export class NewTicketComponent {
  
  supportTicketForm: FormGroup
  date: Date = new Date()
  authData: AuthModel = this.authService.getUser()

  
  constructor(
    private permissionService: PermissionsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private utilitiesService: UtilitiesService,
    private supportTicketService: SupportTicketService
    ) {
      this.supportTicketForm = this.createsupportTicketForm()
    }
    
    private createsupportTicketForm() {
      return this.formBuilder.group({
        email: ['', [Validators.required]],
        description: ['', [Validators.required]],
        subject: ['', [Validators.required]]
      })
    }
    get formSupportTicketValues(): supportTicketModel {
      return {
        email: this.authData.user.email,//this.supportTicketForm.get('email')?.value,
        subject: this.supportTicketForm.get('subject')?.value,
        description: this.supportTicketForm.get('description')?.value
      }
    }
    
    async sendSupportTicket() {
      if (this.supportTicketForm.invalid) {
        this.messageService.error('', 'Datos no válidos o faltantes')
        return
      }
      const newTicket = this.formSupportTicketValues
      
      const response = await this.supportTicketService
      .sendSupportTicket(newTicket).toPromise()
      
      
      
      
    }

    

  }
  