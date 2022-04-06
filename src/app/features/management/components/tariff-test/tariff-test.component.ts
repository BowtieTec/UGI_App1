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
import { CourtesyService } from '../../../courtesy/services/courtesy.service'
import { CourtesyModel } from '../../../courtesy/models/Courtesy.model'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-tariff-test',
  templateUrl: './tariff-test.component.html',
  styleUrls: ['./tariff-test.component.css']
})
export class TariffTestComponent {
  tariffTestForm: FormGroup
  allParkingLot: ParkingModel[] = []
  courtesies: CourtesyModel[] = []
  ticket: TicketTestModule
  private courtesyId: string = ''
  private parkingId: string = this.authService.getParking().id
  tariffTestPermission = environment.tariffTest
  constructor(
    private permissionService: PermissionsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private parkingService: ParkingService,
    private messageService: MessageService,
    private testService: TariffTestService,
    private courtesyService: CourtesyService,
    private utilitiesService: UtilitiesService
  ) {
    this.ticket = new TicketTestModule()
    this.tariffTestForm = this.createTariffTestForm()
    this.getInitialData().catch()
  }

  get isSudo() {
    return this.authService.isSudo
  }

  get formTariffTestValues(): tariffTestModel {
    return {
      parkingId: this.parkingId,
      entry_date: new Date(this.tariffTestForm.get('date_in')?.value),
      exit_date: new Date(this.tariffTestForm.get('date_out')?.value),
      courtesyId: this.tariffTestForm.get('courtesyId')?.value
    }
  }

  ifHaveAction(action: string) {
    return this.permissionService.ifHaveAction(action)
  }

  get parkingSelected() {
    this.parkingId = this.tariffTestForm.get('parking')?.value
    this.tariffTestForm.controls['courtesyId'].setValue('')
    return this.tariffTestForm.get('parking')?.value
  }

  courtesySelected() {
    this.courtesyId = this.tariffTestForm.get('courtesyId')?.value
  }

  async getTariffTest() {
    if (this.tariffTestForm.invalid) {
      this.messageService.error('', 'Datos no válidos o faltantes')
      return
    }
    const newTest = this.formTariffTestValues
    console.log(newTest)
    this.ticket = await this.testService
      .getTariffTest(newTest)
      .then((x) => x.ticket)
  }

  validateDateForm(control: string) {
    return this.utilitiesService.controlInvalid(this.tariffTestForm, control)
  }

  private createTariffTestForm() {
    return this.formBuilder.group({
      parking: [this.parkingId, [Validators.required]],
      date_in: ['', [Validators.required]],
      date_out: ['', [Validators.required]],
      courtesyId: ['']
    })
  }

  private async getInitialData() {
    await this.getCourtesies()
    await this.getAllParkingLot()
  }

  private getAllParkingLot() {
    return this.parkingService.getAllParking().then((x) => {
      if (x.success) {
        this.allParkingLot = x.data.parkings
      }
    })
  }

  getCourtesies(parkingId = this.parkingId) {
    return this.courtesyService
      .getCourtesys(parkingId)
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.courtesies = data.data
        } else {
          this.messageService.error('', data.message)
        }
      })
  }
}
