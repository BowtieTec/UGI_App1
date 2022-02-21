import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { CourtesyService } from '../../services/courtesy.service'
import { MessageService } from '../../../../shared/services/message.service'
import { CourtesyModel, CourtesyTypeModel } from '../../models/Courtesy.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UtilitiesService } from '../../../../shared/services/utilities.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { DataTableDirective } from 'angular-datatables'
import { Subject } from 'rxjs'
import { DataTableOptions } from '../../../../shared/model/DataTableOptions'
import { saveAs } from 'file-saver'
import { PermissionsService } from '../../../../shared/services/permissions.service'
import { environment } from '../../../../../environments/environment'
import { ParkingService } from '../../../parking/services/parking.service'
import { ParkingModel } from '../../../parking/models/Parking.model'
import { CompaniesModel } from '../../../management/components/users/models/companies.model'
import { CompaniesService } from '../../../management/components/users/services/companies.service'

@Component({
  selector: 'app-courtesy',
  templateUrl: './courtesy.component.html',
  styleUrls: ['./courtesy.component.css']
})
export class CourtesyComponent implements AfterViewInit, OnDestroy {
  allParking: ParkingModel[] = []
  courtesyTypes: CourtesyTypeModel[] = []
  newCourtesyForm: FormGroup
  parkingId: string = this.authService.getParking().id
  courtesies: CourtesyModel[] = []
  allCompanies: CompaniesModel[] = []

  /*Table*/
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective
  dtTrigger: Subject<any> = new Subject()
  formGroup: FormGroup

  /*Permissions*/
  listCourtesy = environment.listCourtesy
  downloadCourtesy = environment.downloadCourtesy
  createCourtesy = environment.createCourtesy

  constructor(
    private courtesyService: CourtesyService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permissionService: PermissionsService,
    private parkingService: ParkingService,
    private companyService: CompaniesService
  ) {
    this.messageService.showLoading()
    this.formGroup = formBuilder.group({ filter: [''] })
    this.newCourtesyForm = this.createForm()
    this.getInitialData().then(() => {
      this.messageService.hideLoading()
    })
  }

  get isSudo() {
    return this.authService.isSudo
  }

  get parkingSelected() {
    return this.newCourtesyForm.get('parkingId')?.value
  }

  get dtOptions() {
    return DataTableOptions.getSpanishOptions(10)
  }

  getTypeDescription(id: number) {
    const newDescription = this.courtesyTypes.find((x) => x.id == id)
    return newDescription == undefined
      ? new CourtesyTypeModel()
      : newDescription
  }

  ifHaveAction(action: string) {
    return this.permissionService.ifHaveAction(action)
  }

  controlInvalid(control: string) {
    return this.utilitiesService.controlInvalid(this.newCourtesyForm, control)
  }

  getInitialData() {
    return this.courtesyService
      .getTypes()
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.courtesyTypes = data.data.type
          this.messageService.hideLoading()
        } else {
          this.messageService.errorTimeOut(
            '',
            'No se pudo cargar la información inicial. Intente mas tarde.'
          )
        }
      })
      .then(() => {
        return this.getCourtesies()
      })
      .then(() => {
        this.parkingService
          .getAllParking()
          .then((x) => (this.allParking = x.data.parkings))
      })
      .then(() => {
        return this.companyService
          .getCompanies(this.parkingId)
          .toPromise()
          .then((x) => (this.allCompanies = x))
      })
      .then(() => {
        this.messageService.hideLoading()
      })
  }

  getCourtesy(): any {
    return {
      parkingId: this.parkingId,
      name: this.newCourtesyForm.controls['name'].value,
      type: this.newCourtesyForm.controls['type'].value,
      value: this.newCourtesyForm.controls['value'].value,
      quantity: this.newCourtesyForm.controls['quantity'].value,
      companyId: this.newCourtesyForm.controls['companyId'].value
    }
  }

  getCourtesies(parkingId = this.parkingId) {
    return this.courtesyService
      .getCourtesys(parkingId)
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.courtesies = data.data
          this.rerender()
        } else {
          this.messageService.error('', data.message)
        }
      })
  }

  getCompanyName(id: string) {
    return this.allCompanies.find((x) => x.id == id)?.name
  }

  saveCourtesy() {
    if (this.newCourtesyForm.valid) {
      this.messageService.showLoading()
      const newCourtesy: CourtesyModel = this.getCourtesy()
      this.courtesyService.saveCourtesy(newCourtesy).subscribe((data) => {
        if (data.success) {
          this.messageService.OkTimeOut()
        } else {
          this.messageService.error('', data.message)
        }
        this.getCourtesies().then(() => {
          this.messageService.hideLoading()
        })
      })
    } else {
      this.messageService.errorTimeOut(
        'Datos faltantes o incorrectos',
        'Por favor, verificar que los datos son correctos y estan completos.'
      )
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  downloadPDF(courtesies: CourtesyModel) {
    this.messageService.showLoading()
    courtesies.id = !courtesies.id ? '' : courtesies.id
    this.courtesyService.getPDF(courtesies.id).subscribe((data) => {
      saveAs(data, courtesies.name + '.pdf')
      this.messageService.OkTimeOut()
    })
  }

  private createForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      parkingId: [this.authService.getParking().id],
      companyId: ['0', [Validators.required]]
    })
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
