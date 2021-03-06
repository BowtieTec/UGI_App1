import {AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core'
import {CreateStation, StationsCourtesyModel} from '../../../../../parking/models/StationaryCourtesy.model'
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms'
import {MessageService} from '../../../../../../shared/services/message.service'
import {ParkingService} from '../../../../../parking/services/parking.service'
import {ParkingModel} from '../../../../../parking/models/Parking.model'
import {AuthService} from '../../../../../../shared/services/auth.service'
import {DataTableDirective} from 'angular-datatables'
import {Subject} from 'rxjs'
import {DataTableOptions} from '../../../../../../shared/model/DataTableOptions'
import { ResponseModel } from '../../../../../../shared/model/Request.model'
import { UtilitiesService } from '../../../../../../shared/services/utilities.service'
import { environment } from '../../../../../../../environments/environment'
import { PermissionsService } from '../../../../../../shared/services/permissions.service'

@Component({
  selector: 'app-antennas-from-courtesy',
  templateUrl: './antennas-from-courtesy.component.html',
  styleUrls: ['./antennas-from-courtesy.component.css']
})
export class AntennasFromCourtesyComponent implements AfterViewInit, OnDestroy {
  @Input() parkingId: string = this.authService.getParking().id
  @Output() stationsSaved = new EventEmitter<boolean>()
  stationsCourtesy: StationsCourtesyModel[] = []
  idEditAntenna = ''
  antennasForm: UntypedFormGroup
  allParking: ParkingModel[] = Array<ParkingModel>()
  /* Permissions */
  editStationsCourtesyStationary: string = environment.editStationsCourtesyStationary
  deleteStationsCourtesyStationary: string = environment.deleteStationsCourtesyStationary

  /*Table*/
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective
  dtTrigger: Subject<any> = new Subject()
  formGroup: UntypedFormGroup
  private actions: string[] = this.permissionService.actionsOfPermissions
  constructor(
    private formBuilder: UntypedFormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permissionService: PermissionsService
  ) {
    this.antennasForm = this.createAntennasForm()
    this.formGroup = formBuilder.group({filter: ['']})
    this.getInitialData()
  }

  get isSudo() {
    return this.authService.isSudo
  }

  get dtOptions() {
    return DataTableOptions.getSpanishOptions(10)
  }

  cleanForm() {
    this.idEditAntenna = ''
    this.antennasForm.controls['parkingId'].setValue(this.parkingId)
    this.antennasForm.controls['name'].setValue('');
    this.antennasForm.controls['mac'].setValue('');
    this.antennasForm.controls['antena'].setValue('');
    this.utilitiesService.markAsUnTouched(this.antennasForm)
  }

  get antennaFormValue(): CreateStation {
    return {
      parking: this.antennasForm.get('parkingId')?.value,
      mac: this.antennasForm.get('mac')?.value,
      name: this.antennasForm.get('name')?.value,
      antena: this.antennasForm.get('antena')?.value
    }
  }

  validateId(id: string | undefined) {
    return id == undefined ? '' : id
  }

  editAntenna(antenna: StationsCourtesyModel){
    antenna.id = this.validateId(antenna.id);
    this.idEditAntenna = antenna.id;
    this.antennasForm.controls['parkingId'].setValue(antenna.parking.id);
    this.antennasForm.controls['name'].setValue(antenna.name);
    this.antennasForm.controls['mac'].setValue(antenna.mac);
    this.antennasForm.controls['antena'].setValue(antenna.antena);

  }

  deleteAntenna(antenna: StationsCourtesyModel){
    this.message.showLoading()
    antenna.id = this.validateId(antenna.id)
    this.parkingService.deleteAntennaWithCourtesy(antenna.id).subscribe((data)=>{
      if(data.success){
        this.searchStationsByParking()
        this.message.OkTimeOut('Borrada')
        this.stationsSaved.emit(true)
      } else {
        this.message.error(data.message)
      }
    })
  }

  getInitialData() {
    try {
      this.message.showLoading()
      Promise.all([
        this.parkingService.getAllParking().then((data) => data.data.parkings),
        this.parkingService.getAntennasWithStationaryCourtesy(this.parkingId)
      ])
        .then((resp) => {
          this.allParking = resp[0]
          this.stationsCourtesy = resp[1]
        })
        .then(() => this.rerender())
    } catch (ex: any) {
      throw new Error(ex.message)
    } finally {
      setTimeout(() => {
        this.message.hideLoading()
      }, 3000)
    }
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action)
  }


  async searchStationsByParking() {
    const parkingId = this.antennasForm.controls['parkingId'].value
    this.stationsCourtesy =
      await this.parkingService.getAntennasWithStationaryCourtesy(parkingId)
    if (this.stationsCourtesy) {
      this.parkingId = parkingId
      this.rerender()
    }

  }

  ngAfterViewInit(): void {
    this.dtTrigger.next()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  async createStationWithCourtesy() {
    if (this.antennasForm.invalid) {
      this.message.errorTimeOut('', 'Datos incorrectos o faltantes.')
      return
    }
        this.message.showLoading()
    const newAntenna = this.antennaFormValue

    if(this.idEditAntenna == ''){
      this.parkingService.createStationWithCourtesy(
        newAntenna
      ).subscribe((data) =>{
        if(data.success){
          this.cleanForm()
          this.searchStationsByParking()
          this.message.OkTimeOut()
          this.stationsSaved.emit(true)
        } else {
          this.message.error(data.message)
        }

      })

    }else{
      newAntenna.id = this.idEditAntenna
      this.parkingService.editStationWithCourtesy(newAntenna)
        .subscribe((data) =>{
          if(data.success){
            this.cleanForm()
            this.searchStationsByParking()
            this.message.OkTimeOut()
            this.stationsSaved.emit(true)
          } else {
            this.message.error(data.message)
          }

        })
      this.idEditAntenna = ''
    }


  }

  private createAntennasForm() {
    return this.formBuilder.group({
      parkingId: [this.parkingId, [Validators.required]],
      mac: ['', [Validators.required]],
      name: [null, [Validators.required, Validators.maxLength(50)]],
      antena: ['']
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
