import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../../shared/services/message.service';
import { ParkingService } from '../../services/parking.service';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import {
  MonthlyUserModel,
  ProfilesModel,
  SubscriptionModel,
} from '../../models/MontlyParking.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableOptions } from '../../../../shared/model/DataTableOptions';

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

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = DataTableOptions.getSpanishOptions(10);
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService
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
      profile_subscription: ['', [Validators.required, Validators.min(1)]],
    });
  }

  createMonthly() {
    this.message.showLoading();
    const newSubscription: any = this.getFormValue();
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
    this.message.showLoading();
    this.parkingService
      .getUsersByTelephone(this.monthlyForm.controls['telephone'].value)
      .then((data) => {
        if (data.success) {
          this.userSearched.push(data.data.user);
          console.log(data.data.user);
          //  TODO: Recibir el array de users
        }
      })
      .then(() => {
        this.message.hideLoading();
      });
  }

  get isUnlimitedForm() {
    return this.monthlyForm.controls['isUnlimited'];
  }

  get isByDateForm() {
    return this.monthlyForm.controls['byDate'];
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
    return {
      userId: this.userSelected.id,
      parkingId: this.authService.getParking().id,
      amount: this.monthlyForm.controls['amount'].value,
      enables_days: this.getDays(),
      isUnlimited: this.isUnlimitedForm.value,
      begin_date: this.monthlyForm.controls['begin_date'].value,
      finish_date: this.monthlyForm.controls['finish_date'].value,
      profile_subscription:
        this.monthlyForm.controls['profile_subscription'].value,
    };
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

  getProfiles() {
    const parkingId = this.authService.getParking().id;
    return this.parkingService
      .getProfilesOfMonthlySubscription(parkingId)
      .then((data) => {
        if (data.success) {
          this.profiles = data.data.profiles;
          console.log(this.profiles);
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
          this.subscriptions = data.data.profiles;
          console.log(this.subscriptions);
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

  private rerender() {
    if (this.dtElement != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }
}
