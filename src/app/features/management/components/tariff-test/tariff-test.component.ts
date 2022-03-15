import { Component } from '@angular/core'
import { PermissionsService } from 'src/app/shared/services/permissions.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth.service'
import { ParkingModel } from 'src/app/features/parking/models/Parking.model'
import { ParkingService } from 'src/app/features/parking/services/parking.service'
import { MessageService } from 'src/app/shared/services/message.service'
import { TariffTestService } from './services/tariff-test.service'
import { tariffTestModel } from './models/tariff-test.model'
import { TicketTestModule } from './models/ticket-test.module'
import { UtilitiesService } from 'src/app/shared/services/utilities.service'

@Component({
  selector: 'app-tariff-test',
  templateUrl: './tariff-test.component.html',
  styleUrls: ['./tariff-test.component.css']
})
export class TariffTestComponent {
  tariffTestForm: FormGroup
  allParkingLot: ParkingModel[] = []
  ticket: TicketTestModule
  private parkingId: string = this.authService.getParking().id

  constructor(
    private permissionService: PermissionsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private parkingService: ParkingService,
    private messageService: MessageService,
    private testService: TariffTestService,
    private utilitiesService: UtilitiesService
  ) {
    this.ticket = new TicketTestModule()
    this.tariffTestForm = this.createTariffTestForm()
    this.getInitialData().catch()
  }

  get isSudo() {
    return this.authService.isSudo
  }

  get formTarifftestValues(): tariffTestModel {
    return {
      parkingId: this.parkingId,
      entry_date: new Date(this.tariffTestForm.get('date_in')?.value),
      exit_date: new Date(this.tariffTestForm.get('date_out')?.value)
    }
  }

  ifHaveAction(action: string) {
    return this.permissionService.ifHaveAction(action)
  }

  async getTariffTest() {
    if (this.tariffTestForm.invalid) {
      this.messageService.error('', 'Datos no válidos o faltantes')
      return
    }
    const newTest = this.formTarifftestValues
    const newTicket = await this.testService.getTariffTest(newTest)
    this.ticket.amount = newTicket.ticket.amount
    this.ticket.days = newTicket.ticket.days
    this.ticket.hour = newTicket.ticket.hour
    this.ticket.minute = newTicket.ticket.minute
    this.ticket.tariff = newTicket.ticket.tariff
  }

  validateDateForm(control: string) {
    return this.utilitiesService.controlInvalid(this.tariffTestForm, control)
  }

  private createTariffTestForm() {
    return this.formBuilder.group({
      parking: [this.parkingId, [Validators.required]],
      date_in: ['', [Validators.required]],
      date_out: ['', [Validators.required]]
    })
  }

  private async getInitialData() {
    await this.getAllParkingLot()
  }

  private getAllParkingLot() {
    return this.parkingService.getAllParking().then((x) => {
      if (x.success) {
        this.allParkingLot = x.data.parkings
      }
    })
  }
}
