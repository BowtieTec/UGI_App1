import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core'
import {
  CreateStation,
  StationsCourtesyModel
} from '../../../../../parking/models/StationaryCourtesy.model'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MessageService } from '../../../../../../shared/services/message.service'
import { ParkingService } from '../../../../../parking/services/parking.service'
import { ParkingModel } from '../../../../../parking/models/Parking.model'
import { AuthService } from '../../../../../../shared/services/auth.service'
import { DataTableDirective } from 'angular-datatables'
import { Subject } from 'rxjs'
import { DataTableOptions } from '../../../../../../shared/model/DataTableOptions'

@Component({
  selector: 'app-antennas-from-courtesy',
  templateUrl: './antennas-from-courtesy.component.html',
  styleUrls: ['./antennas-from-courtesy.component.css']
})
export class AntennasFromCourtesyComponent implements AfterViewInit, OnDestroy {
  @Input() parkingId: string = this.authService.getParking().id
  @Output() stationsSaved = new EventEmitter<boolean>()
  stationsCourtesy: StationsCourtesyModel[] = []
  antennasForm: FormGroup
  allParking: ParkingModel[] = Array<ParkingModel>()

  /*Table*/
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective
  dtTrigger: Subject<any> = new Subject()
  formGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private authService: AuthService
  ) {
    this.antennasForm = this.createAntennasForm()
    this.formGroup = formBuilder.group({ filter: [''] })
    this.getInitialData()
  }

  get isSudo() {
    return this.authService.isSudo
  }

  get dtOptions() {
    return DataTableOptions.getSpanishOptions(10)
  }

  get antennaFormValue(): CreateStation {
    return {
      parking: this.antennasForm.get('parkingId')?.value,
      mac: this.antennasForm.get('mac')?.value,
      name: this.antennasForm.get('name')?.value,
      antena: this.antennasForm.get('antena')?.value
    }
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
    } catch (ex) {
      throw new Error(ex.message)
    } finally {
      setTimeout(() => {
        this.message.hideLoading()
      }, 3000)
    }
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
    const result = await this.parkingService.createStationWithCourtesy(
      newAntenna
    )
    if (result.success) {
      await this.searchStationsByParking()
      this.message.OkTimeOut()
      this.stationsSaved.emit(true)
    } else {
      this.message.error(result.message)
    }
  }

  private createAntennasForm() {
    return this.formBuilder.group({
      parkingId: [this.parkingId, [Validators.required]],
      mac: [null, [Validators.required, Validators.maxLength(17)]],
      name: [null, [Validators.required, Validators.maxLength(30)]],
      antena: [null, [Validators.required, Validators.maxLength(20)]]
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
