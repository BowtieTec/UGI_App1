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
import { SelectModel } from '../../../../shared/model/CommonModels'

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
  typeCourtesies: SelectModel[] = []
  stationsCourtesies: StationsCourtesyModel[] = []
  allAntennas: StationsCourtesyModel[] = []
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

  async getTypeCourtesies(): Promise<SelectModel[]> {
    return this.courtesyService
      .getTypes()
      .toPromise()
      .then((x) => {
        return x.data.type.filter((x:any) => x.id !=3)
      })
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action)
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      parkingId: [this.authService.getParking().id, [Validators.required]],
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

  async getCourtesiesStationary(): Promise<StationsCourtesyModel[]> {
 /*
  *  When courtesy_details is null, that means that the antenna doesn't have courtesy
  *  is just the antenna.
  *  When courtesy_details is not null,
  *  that means that the antennas has courtesy.
  */
    return await this.parkingService.getAntennasWithStationaryCourtesy(this.parkingId).then(x => x.filter(a => a.courtesy_detail))
  }

  async searchAntennasByParking() {
    if (this.authService.isSudo && !this.idEditAntenna) {
      this.message.showLoading()
      this.parkingId = this.stationaryForm.controls['parkingId']?.value
      this.allAntennas = await this.parkingService.getAntennasWithStationaryCourtesy(this.parkingId)
      this.stationsCourtesies = await this.getCourtesiesStationary()
      this.rerender()
      this.message.hideLoading()
    }
    return this.stationsCourtesies
  }

  async getInitialData() {
    try {
      this.message.showLoading()
      Promise.all([
        this.parkingService.getAllParking().then((data) => data.data.parkings),
        this.getTypeCourtesies(),
        this.getCourtesiesStationary(),
        this.courtesyService.getTypes().toPromise(),
        this.companyService.getCompanies(this.parkingId).toPromise()
      ])
        .then((resp) => {
          this.allParking = resp[0]
          this.typeCourtesies = resp[1].filter(x => x.id <= 2)
          this.stationsCourtesies = resp[2]
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
      ? { id: null, name: 'Sin descripción' }
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
