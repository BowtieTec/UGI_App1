import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../../shared/services/message.service';
import { ParkingService } from '../../services/parking.service';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import {
  CreateProfilesModel,
  GetStationModel,
  MonthlyUserModel,
  ProfilesModel,
  SubscriptionModel,
} from '../../models/MontlyParking.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableOptions } from '../../../../shared/model/DataTableOptions';
import { ResponseModel } from '../../../../shared/model/Request.model';
import { PermissionsService } from '../../../../shared/services/permissions.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-monthly-parking',
  templateUrl: './monthly-parking.component.html',
  styleUrls: ['./monthly-parking.component.css'],
})
export class MonthlyParkingComponent implements AfterViewInit, OnDestroy {
  monthlyForm: FormGroup = this.createForm();
  userSelected: MonthlyUserModel = new MonthlyUserModel();
  userSearched: Array<MonthlyUserModel> = [];
  profiles: ProfilesModel[] = [];
  subscriptions: SubscriptionModel[] = [];
  stationsByParking: GetStationModel[] = [];
  nameProfile: string = '';

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = DataTableOptions.getSpanishOptions(10);
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;
  loadingUser: boolean = false;
  createMonthlyParking = environment.createMonthlyParking;
  deleteMonthlyParking = environment.deleteMonthlyParking;
  cancelMonthlyParking = environment.cancelMonthlyParking;
  disableMonthlyParking = environment.disableMonthlyParking;
  createAccessProfileMonthlyParking =
    environment.createAccessProfileMonthlyParking;
  private actions: string[] = this.permissionService.actionsOfPermissions;

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permissionService: PermissionsService
  ) {
    this.message.showLoading();
    this.formGroup = formBuilder.group({ filter: [''] });
    this.getProfiles()
     .then(() => {
         return this.getMonthlySubscription();
      })
      .then(() => {
        this.rerender();
      })
      .then(() => this.getAntennasByParking())
      .then((data) => {
        this.message.hideLoading();
      });
  }

  get byDate() {
    return this.monthlyForm.controls['byDate']?.value;
  }

  get completeNameSelected() {
    return `${this.userSelected.name} ${this.userSelected.last_name}`;
  }

  get nameTelephone() {
    if (!this.userSelected.name) {
      return '';
    }
    return `${this.completeNameSelected}, Teléfono: ${this.userSelected.phone_number} `;
  }

  get isUnlimitedForm() {
    return this.monthlyForm.controls['isUnlimited'];
  }

  createForm() {
    return this.formBuilder.group({
      amount: [null, [Validators.required, Validators.min(0)]],
      monday: [false],
      tuesday: [false],
      wednesday: [false],
      thursday: [false],
      friday: [false],
      saturday: [false],
      sunday: [false],
      telephone: [null, [Validators.required, Validators.minLength(7)]],
      isUnlimited: [true],
      begin_date: [null],
      finish_date: [null],
      profile_subscription: [''],
    });
  }

  createMonthly() {
    if (!this.monthlyForm.valid || !this.userSelected.id) {
      this.message.error(' Hacen falta datos o son inválidos.');
      return;
    }
    this.message.showLoading();
    let newSubscription: any = this.getFormValue();
    if (!newSubscription) return;
    if (this.monthlyForm.controls['profile_subscription'].value == '') {
      delete newSubscription.profile_subscription;
    }
    this.parkingService
      .createMonthlySubscription(newSubscription)
      .then((data) => {
        if (!data.success) {
          this.message.error(data.message);
        }
        return this.getMonthlySubscription();
      })
      .then(() => {
        this.message.Ok('Guardado');
      });
  }

  searchUser() {
    this.loadingUser = true;
    this.message.showLoading();
    this.parkingService
      .getUsersByTelephone(this.monthlyForm.controls['telephone'].value)
      .then((data) => {
        if (data.success) {
          this.userSearched = data.data.users;
        }
      })
      .then(() => {
        this.message.hideLoading();
        this.loadingUser = false;
      });
  }

  userSelect(user: any) {
    this.userSelected = user;
    this.message.OkTimeOut(user.name + ' ' + user.last_name + ' Seleccionado');
  }

  changeValueIsUnlimited() {
    const isUnlimited: boolean = this.isUnlimitedForm.value;
    this.isUnlimitedForm.setValue(!isUnlimited);
  }

  getFormValue() {
    const enables_days = this.getDays();
    if (enables_days.length <= 0) {
      this.message.error(
        '',
        'No ha seleccionado dias permitidos para entrar al parqueo mensual.'
      );
      return;
    }

    return {
      userId: this.userSelected.id,
      parkingId: this.authService.getParking().id,
      amount: this.monthlyForm.controls['amount'].value,
      enables_days,
      isUnlimited: this.isUnlimitedForm.value,
      begin_date: this.monthlyForm.controls['begin_date'].value,
      finish_date: this.monthlyForm.controls['finish_date'].value,
      profile_subscription:
        this.monthlyForm.controls['profile_subscription'].value,
    };
  }

  getProfiles() {
    const parkingId = this.authService.getParking().id;
    return this.parkingService
      .getProfilesOfMonthlySubscription(parkingId)
      .then((data) => {
        if (data.success) {
          this.profiles = data.data.profiles;
        } else {
          this.message.error(data.message);
        }
      });
  }

  getMonthlySubscription() {
    const parkingId = this.authService.getParking().id;
   return this.parkingService
      .getMonthlySubscription(parkingId)
      .then((data) => {
        if (data.success) {
          this.subscriptions = data.data.subscriptions;
        } else {
          this.message.error('', data.message);
        }
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  disableSubscription(idSubscription: string) {
    this.parkingService.disableSubscription(idSubscription).then((data) => {
      this.resolveResponse(data);
    });
  }

  cancelSubscription(idSubscription: string) {
    this.parkingService.cancelSubscription(idSubscription).then((data) => {
      this.resolveResponse(data);
    });
  }

  deleteSubscription(idSubscription: string) {
    this.parkingService.deleteSubscription(idSubscription).then((data) => {
      this.resolveResponse(data);
    });
  }

  resolveResponse(data: ResponseModel) {
    if (data.success) {
      this.getMonthlySubscription()
        .then(() => this.getProfiles())
        .then(() => this.message.Ok());
    } else {
      this.message.error('', data.message);
    }
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.monthlyForm, control);
  }

  createNewProfile() {
    if (this.nameProfile.length <= 0) {
      this.message.error('', 'No ha asignado un nombre el perfil de acceso');
      return;
    }
    if (this.getStationsToCreateProfile().length <= 0) {
      this.message.error('', 'No ha elegido estaciones para el perfil');
      return;
    }
    const newProfile: CreateProfilesModel = {
      parkingId: this.authService.getParking().id,
      name: this.nameProfile,
      stations: this.getStationsToCreateProfile(),
    };
    this.parkingService.createAccessProfile(newProfile).then((data) => {
      this.resolveResponse(data);
    });
  }

  getStationsToCreateProfile(): any {
    return this.stationsByParking.filter((x) => x.addStation);
  }

  getAntennasByParking() {
    this.message.showLoading();
    this.parkingService
      .getAntennas(this.authService.getParking().id)
      .subscribe((data) => {
        if (data.success) {
          this.stationsByParking = data.data.stations;
          /*
          Para ver ejemplo de como se ver[ia con estaciones privadas,
          solo se debe comentar las siguientes dos lineas que pertenecen al filter:
          */
          this.stationsByParking = this.stationsByParking.filter(
            (x) => x.isPrivate
          );
        } else {
          this.message.error('', data.message);
        }
        this.message.hideLoading();
      });
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action);
  }

  private getDays() {
    return [
      {
        id: 0,
        name: 'Domingo',
        isEnable: this.monthlyForm.controls['sunday'].value,
      },
      {
        id: 1,
        name: 'Lunes',
        isEnable: this.monthlyForm.controls['monday'].value,
      },
      {
        id: 2,
        name: 'Martes',
        isEnable: this.monthlyForm.controls['tuesday'].value,
      },
      {
        id: 3,
        name: 'Miércoles',
        isEnable: this.monthlyForm.controls['wednesday'].value,
      },
      {
        id: 4,
        name: 'Jueves',
        isEnable: this.monthlyForm.controls['thursday'].value,
      },
      {
        id: 5,
        name: 'Viernes',
        isEnable: this.monthlyForm.controls['friday'].value,
      },
      {
        id: 6,
        name: 'Sábado',
        isEnable: this.monthlyForm.controls['saturday'].value,
      },
    ].filter((day) => day.isEnable === true);
  }

  private rerender() {
    if (this.dtElement != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }
}
