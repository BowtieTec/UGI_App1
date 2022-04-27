import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {ParkingService} from '../../services/parking.service'
import {ParkedModel, ParkingModel, StatusParked} from '../../models/Parking.model'
import {AuthService} from '../../../../shared/services/auth.service'
import {DataTableDirective} from 'angular-datatables'
import {DataTableOptions} from '../../../../shared/model/DataTableOptions'
import {Subject} from 'rxjs'
import {MessageService} from '../../../../shared/services/message.service'
import {environment} from '../../../../../environments/environment'
import {PermissionsService} from '../../../../shared/services/permissions.service'

@Component({
  selector: 'app-parked',
  templateUrl: './parked.component.html',
  styleUrls: ['./parked.component.css']
})
export class ParkedComponent implements OnDestroy, AfterViewInit {
  parkedForm: FormGroup = this.createForm()
  parkingData: ParkingModel[] = []
  parkedData: Array<ParkedModel> = []
  statusParked = StatusParked
  dateOutToGetOut: Date = new Date()

  @ViewChild(DataTableDirective) dtElement!: DataTableDirective
  dtTrigger: Subject<any> = new Subject()
  formGroup: FormGroup = this.formBuilder.group({filter: ['']})

  getOutWithPayment = environment.getOutWithPaymentDoneParkedParking
  getOutWithoutPayment = environment.getOutWithoutPaymentDoneParkedParking
  private actions: string[] = this.permissionService.actionsOfPermissions

  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService,
    private authService: AuthService,
    private messageService: MessageService,
    private permissionService: PermissionsService
  ) {
    this.getInitialData().catch()
  }

  get isSudo() {
    return this.authService.isSudo
  }

  get dtOptions() {
    return DataTableOptions.getSpanishOptions(10)
  }

  async getInitialData() {
    this.messageService.showLoading()
    await this.getAllParking()
    if (this.isSudo) {
      await this.parkedForm
        .get('parkingId')
        ?.setValue(this.authService.getParking().id)
    }
    await this.getParkedData().then(() => this.rerender()).then(() => {
    })
    setInterval(() => {
      this.refreshParkedData()
    }, 10000)

    this.messageService.hideLoading()
    // await this.getParked().then(() => this.messageService.hideLoading());
  }

  async refreshParkedData() {
    return this.getParkedData().then(() => this.rerender())
  }

  private async getParkedData() {
    return this.parkingService
      .getParked(
        this.getParkedFormValues(),
      )
      .toPromise().then((data) => this.parkedData = data.data)
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      parkingId: ['0'],
      status: ['1'],
      textToSearch: [''],
      dateOutToGetOut: ['']
    })
  }

  async getAllParking() {
    if (!this.authService.isSudo) {
      return
    }
    return this.parkingService.getAllParking().then((data) => {
      if (data.success) {
        this.parkingData = data.data.parkings
      }
    })
  }

  getParkedFormValues() {
    const status =
      this.parkedForm.get('status')?.value != ''
        ? this.parkedForm.get('status')?.value
        : '1'
    const parkingId =
      this.isSudo && this.parkedForm.get('parkingId')?.value != '0'
        ? this.parkedForm.get('parkingId')?.value
        : this.authService.getParking().id
    const textToSearch = this.parkedForm.get('textToSearch')?.value
    return {
      status,
      parkingId,
      textToSearch
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action)
  }

  async getStatusToSave(parked_type: number) {
    let status = 3
    if (parked_type == 0) {
      if (this.ifHaveAction(this.getOutWithoutPayment)) {
        status = 2
      }
      if (
        this.ifHaveAction(this.getOutWithoutPayment) &&
        this.ifHaveAction(this.getOutWithPayment)
      ) {
        const statusWillUpdate = await this.messageService.areYouSureWithCancelAndInput(
          '¿Dejar salir a usuario con el cobro pendiente o cancelado?',
          'Cobrar parqueo',
          this.dateOutToGetOut
        )
        if (statusWillUpdate.isConfirmed) status = 3
        if (statusWillUpdate.isDenied) status = 2
        if (statusWillUpdate.isDismissed) return -1
      }
    }
    return status
  }

  async getOut(parked: ParkedModel) {
    const status = await this.getStatusToSave(parked.type)
    if (!this.dateOutToGetOut) {
      this.messageService.error('Debe seleccionar una fecha de salida')
      return
    }
    console.log(this.dateOutToGetOut <= parked.entry_date)
    if (new Date(this.dateOutToGetOut) <= new Date(parked.entry_date)) {
      this.messageService.error('La fecha y hora de salida debe ser mayor a la de entrada.')
      return
    }
    if (status == -1) {
      return
    }
    const result = await this.messageService.areYouSure(
      `¿Esta seguro que desea sacar al usuario ${parked.user_name} ${parked.last_name} del parqueo ${parked.parking}?`
    )
    if (result.isDenied) {
      this.messageService.infoTimeOut(
        '!No te preocupes!, no se hicieron cambios.'
      )
      return
    }
    if (result.isConfirmed) {
      this.messageService.showLoading()
      this.parkingService.getOutParked(parked.id, status, this.dateOutToGetOut).then((data) => {
        if (data.success) {
          this.rerender()
          this.messageService.Ok(data.message)
          this.dateOutToGetOut = new Date()
        } else {
          this.messageService.error('', data.message)
        }
      })
    }
  }

  rerender() {
    if (this.dtElement != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy()
        this.dtTrigger.next()
      })
    }
  }

  getTimeInParking(entry_date: any) {
    const oldTime = new Date(entry_date).getTime()
    const timeNow = new Date().getTime()
    const days = Math.round((timeNow - oldTime) / (1000 * 60 * 60 * 24))
    const hours = Math.round(
      (Math.abs(timeNow - oldTime) / (1000 * 60 * 60)) % 24
    )
    const minutes = Math.round((Math.abs(timeNow - oldTime) / (1000 * 60)) % 60)

    if (days > 0) return `${days} dias con ${hours} horas`
    if (hours > 0) return `${hours} horas con ${minutes} minutos`
    if (minutes > 0) return `${minutes} minutos`

    return 'No calculable'
  }
}
