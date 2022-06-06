import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core'
import {FormBuilder, FormGroup} from '@angular/forms'
import {MessageService} from '../../../../shared/services/message.service'
import {ParkingService} from '../../services/parking.service'
import {UtilitiesService} from '../../../../shared/services/utilities.service'
import {
  CreateProfilesModel,
  GetStationModel,
  MonthlyUserModel,
  ProfilesModel,
  SubscriptionModel
} from '../../models/MontlyParking.model'
import {AuthService} from '../../../../shared/services/auth.service'
import {DataTableDirective} from 'angular-datatables'
import {Subject} from 'rxjs'
import {DataTableOptions} from '../../../../shared/model/DataTableOptions'
import {ResponseModel} from '../../../../shared/model/Request.model'
import {PermissionsService} from '../../../../shared/services/permissions.service'
import {environment} from '../../../../../environments/environment'

@Component({
  selector: 'app-monthly-parking',
  templateUrl: './monthly-parking.component.html',
  styleUrls: ['./monthly-parking.component.css']
})
export class MonthlyParkingComponent implements AfterViewInit, OnDestroy {
  userSelected: MonthlyUserModel = new MonthlyUserModel()
  userSearched: Array<MonthlyUserModel> = []
  profiles: ProfilesModel[] = []
  subscriptions: SubscriptionModel[] = []
  stationsByParking: GetStationModel[] = []
  nameProfile = ''

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective
  dtOptions: DataTables.Settings = DataTableOptions.getSpanishOptions(10)
  dtTrigger: Subject<any> = new Subject()
  formGroup: FormGroup
  loadingUser = false
  createMonthlyParking = environment.createMonthlyParking
  deleteMonthlyParking = environment.deleteMonthlyParking
  cancelMonthlyParking = environment.cancelMonthlyParking
  disableMonthlyParking = environment.disableMonthlyParking
  private actions: string[] = this.permissionService.actionsOfPermissions

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permissionService: PermissionsService
  ) {
    this.message.showLoading()
    this.formGroup = formBuilder.group({filter: ['']})
    this.getProfiles()
      .then(() => {
        return this.getMonthlySubscription()
      })
      .then(() => {
        return this.rerender()
      })
      .then((data) => {
        this.message.hideLoading()
      })
  }

  get completeNameSelected() {
    return `${this.userSelected.name} ${this.userSelected.last_name}`
  }

  getProfiles() {
    const parkingId = this.authService.getParking().id
    return this.parkingService
      .getProfilesOfMonthlySubscription(parkingId)
      .then((data) => {
        if (data.success) {
          this.profiles = data.data.profiles
        } else {
          this.message.error(data.message)
        }
      })
  }

  getStationsToCreateProfile(): any {
    return this.stationsByParking.filter((x) => x.addStation)
  }

  createNewProfile() {
    if (this.nameProfile.length <= 0) {
      this.message.error('', 'No ha asignado un nombre el perfil de acceso')
      return
    }
    if (this.getStationsToCreateProfile().length <= 0) {
      this.message.error('', 'No ha elegido estaciones para el perfil')
      return
    }
    const newProfile: CreateProfilesModel = {
      parkingId: this.authService.getParking().id,
      name: this.nameProfile,
      stations: this.getStationsToCreateProfile()
    }
    this.parkingService.createAccessProfile(newProfile).then((data) => {
      this.resolveResponse(data)
    })
  }

  getMonthlySubscription() {
    const parkingId = this.authService.getParking().id
    return this.parkingService
      .getMonthlySubscription(parkingId)
      .then((data) => {
        if (data.success) {
          this.subscriptions = data.data.subscriptions
          this.rerender()
        } else {
          this.message.error('', data.message)
        }
      })
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  disableSubscription(idSubscription: string) {
    this.message
      .areYouSure('¿Está seguro que desea congelar esta suscripción?')
      .then((x) => {
        if (x.isConfirmed) {
          this.message.showLoading()
          this.parkingService
            .disableSubscription(idSubscription)
            .then((data) => {
              this.resolveResponse(data)
            })
        }
      })
  }

  cancelSubscription(idSubscription: string) {
    this.parkingService.cancelSubscription(idSubscription).then((data) => {
      this.resolveResponse(data)
    })
  }

  deleteSubscription(idSubscription: string) {
    this.message
      .areYouSure('¿Está seguro que desea eliminar esta suscripción?')
      .then((x) => {
        if (x.isConfirmed) {
          this.message.showLoading()
          this.parkingService
            .deleteSubscription(idSubscription)
            .then((data) => {
              this.resolveResponse(data)
              this.message.OkTimeOut()
            })
        }
      })
  }

  resolveResponse(data: ResponseModel) {
    if (data.success) {
      this.getMonthlySubscription().then(() => this.getProfiles())
      this.message.OkTimeOut()
    } else {
      this.message.error('', data.message)
    }
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action)
  }

  editSubscription(subscription: SubscriptionModel) {
    //TODO: Terminar esta opcion de editar parqueo diario
    this.message.infoTimeOut('En construccion')
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
