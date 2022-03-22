import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MessageService } from '../../../../shared/services/message.service'
import { ParkingService } from '../../../parking/services/parking.service'
import { UtilitiesService } from '../../../../shared/services/utilities.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { PermissionsService } from '../../../../shared/services/permissions.service'
import { environment } from '../../../../../environments/environment'
import { ParkingModel } from '../../../parking/models/Parking.model'
import { CourtesyService } from '../../services/courtesy.service'
import {
  CreateStationaryCourtesy,
  StationsCourtesyModel
} from '../../../parking/models/StationaryCourtesy.model'
import { CourtesyTypeModel } from '../../models/Courtesy.model'
import { DataTableDirective } from 'angular-datatables'
import { Subject } from 'rxjs'
import { DataTableOptions } from '../../../../shared/model/DataTableOptions'
import { CompaniesModel } from '../../../management/components/users/models/companies.model'
import { CompaniesService } from '../../../management/components/users/services/companies.service'

@Component({
  selector: 'app-stationary-courtesy',
  templateUrl: './stationary-courtesy.component.html',
  styleUrls: ['./stationary-courtesy.component.css']
})
export class StationaryCourtesyComponent implements AfterViewInit, OnDestroy {
  loading = true
  @Input() parkingId: string = this.authService.getParking().id
  allCompanies: CompaniesModel[] = []
  stationaryForm: FormGroup
  courtesyTypes: CourtesyTypeModel[] = []
  idEditAntenna = ''
  allParking: ParkingModel[] = Array<ParkingModel>()
  typeCourtesies: Array<{ id: number; name: string }> = []
  stations: StationsCourtesyModel[] = []

  /*Table*/
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective
  dtTrigger: Subject<any> = new Subject()
  formGroup: FormGroup

  /* Permissions */
  createCourtesyStationary: string = environment.createCourtesyStationary
  addStationsCourtesyStationary: string =
    environment.addStationsCourtesyStationary
  private actions: string[] = this.permissionService.actionsOfPermissions

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permissionService: PermissionsService,
    private courtesyService: CourtesyService,
    private companyService: CompaniesService
  ) {
    this.stationaryForm = this.createForm()
    this.formGroup = formBuilder.group({ filter: [''] })
    this.getInitialData().catch()
  }

  get dtOptions() {
    return DataTableOptions.getSpanishOptions(10)
  }

  get isSudo() {
    return this.authService.isSudo
  }

  get stationaryCourtesiesFormValue() {
    return {
      parkingId: this.stationaryForm.get('parkingId')?.value,
      value: this.stationaryForm.get('value')?.value,
      type: this.stationaryForm.get('type')?.value,
      name: this.stationaryForm.get('name')?.value,
      stationId: this.stationaryForm.get('stationId')?.value,
      companyId: this.stationaryForm.controls['companyId'].value
    }
  }

  async getTypeCourtesies(): Promise<Array<{ id: number; name: string }>> {
    return this.courtesyService
      .getTypes()
      .toPromise()
      .then((x) => {
        return x.data.type.map((item: any) => {
          return {
            id: item.id,
            name: item.description
          }
        })
      })
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action)
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      parkingId: [this.parkingId],
      value: ['', [Validators.required, Validators.min(1)]],
      type: ['0', [Validators.required]],
      name: ['', [Validators.required]],
      stationId: ['0', [Validators.required]],
      companyId: ['0', [Validators.required]]
    })
  }

  validateParam(param: any) {
    return param ? param : 'Sin valor'
  }

  async searchAntennasByParking() {
    if (this.authService.isSudo && !this.idEditAntenna) {
      this.message.showLoading()
      this.parkingId = this.stationaryForm.controls['parkingId']?.value
      const newStations =
        await this.parkingService.getAntennasWithStationaryCourtesy(
          this.parkingId
        )
      this.stations = newStations.filter((x) => x.courtesy_detail)
      this.rerender()

      this.message.hideLoading()
    }
    return this.stations
  }

  async getInitialData() {
    try {
      this.message.showLoading()
      Promise.all([
        this.parkingService.getAllParking().then((data) => data.data.parkings),
        this.getTypeCourtesies(),
        this.parkingService.getAntennasWithStationaryCourtesy(this.parkingId),
        this.courtesyService.getTypes().toPromise(),
        this.companyService.getCompanies(this.parkingId).toPromise()
      ])
        .then((resp) => {
          this.allParking = resp[0]
          this.typeCourtesies = resp[1]
          this.stations = resp[2].filter((x) => x.name)
          this.courtesyTypes = resp[3].data.type
          this.allCompanies = resp[4]
        })
        .catch((x) => {
          this.message.errorTimeOut(
            '',
            'Hubo un error al recuperar la información inicial.'
          )
        })
        .then(() => {
          this.rerender()
          this.message.hideLoading()
        })
      this.loading = false
    } catch (err: unknown) {
      throw new Error('')
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  editAntenna(antenna: StationsCourtesyModel) {
    this.message.infoTimeOut('Funcion en construccion')
  }

  deleteAntenna(antenna: StationsCourtesyModel) {
    this.message.infoTimeOut('Funcion en construccion')
  }

  downloadQR(antenna: StationsCourtesyModel) {
    this.message.infoTimeOut('Funcion en construccion')
  }

  getTypeDescription(id: number) {
    const newDescription = this.courtesyTypes.find((x) => x.id == id)
    return newDescription == undefined
      ? { id: null, description: 'Sin descripción' }
      : newDescription
  }

  async addStationaryCourtesies() {
    if (this.stationaryForm.invalid) {
      this.message.error('', 'Datos faltantes o incorrectos.')
      return
    }
    this.message.showLoading()
    try {
      const newCourtesy: CreateStationaryCourtesy =
        this.stationaryCourtesiesFormValue
      const resp = await this.parkingService.createStationaryCourtesy(
        newCourtesy
      )
      if (resp.success) {
        await this.getInitialData()
        this.rerender()
        this.message.OkTimeOut()
      } else {
        this.message.error('', resp.message)
      }
    } finally {
      await this.getInitialData()
      setTimeout(() => this.message.hideLoading(), 3000)
    }
  }

  private rerender() {
    if (this.dtElement != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy()
        this.dtTrigger.next()
      })
    }
  }
}
