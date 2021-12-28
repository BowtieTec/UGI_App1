import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParkingService } from '../../services/parking.service';
import {
  ParkedModel,
  ParkingModel,
  StatusParked,
} from '../../models/Parking.model';
import { AuthService } from '../../../../shared/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { DataTableOptions } from '../../../../shared/model/DataTableOptions';
import { Subject } from 'rxjs';
import { MessageService } from '../../../../shared/services/message.service';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.css'],
})
export class ParkingComponent implements OnDestroy, AfterViewInit {
  parkedForm: FormGroup = this.createForm();
  parkingData: ParkingModel[] = [];
  parkedData: Array<ParkedModel> = [];
  statusParked = StatusParked;

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = DataTableOptions.getSpanishOptions(10);
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.messageService.showLoading();
    this.getAllParking();
    this.formGroup = formBuilder.group({ filter: [''] });
    this.getParked().then(() => this.messageService.hideLoading());
  }

  get isSudo() {
    return this.authService.isSudo;
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      parkingId: ['0'],
      status: ['1'],
    });
  }

  getAllParking() {
    if (!this.authService.isSudo) {
      return;
    }
    this.parkingService.getAllParking().then((data) => {
      if (data.success) {
        this.parkingData = data.data.parkings;
      }
    });
  }

  getParkedFormValues() {
    const status = this.parkedForm.get('status')?.value
      ? this.parkedForm.get('status')?.value
      : '';
    const parkingId = this.isSudo
      ? this.parkedForm.get('parkingId')?.value
      : this.authService.getParking().id;
    return {
      status,
      parkingId,
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  async getParked() {
    this.messageService.showLoading();
    const params = this.getParkedFormValues();
    return this.parkingService.getParked(params).then((data) => {
      if (data.success) {
        this.parkedData = data.data.parked;
      } else {
        this.parkedData = [];
      }
      this.rerender();
      this.messageService.hideLoading();
    });
  }

  ifHaveAction(disableMonthlyParking: any) {}

  async getOut(parked: ParkedModel) {
    let status: number = 3;
    let isCancel: boolean = false;
    if (parked.parked_type == 0) {
      const statusWillUpdate = await this.messageService.areYouSureWithCancel(
        '¿Dejar salir a usuario con el cobro pendiente o cancelado?',
        'Con el cobro cancelado',
        'Con el cobro pendiente'
      );
      if (statusWillUpdate.isConfirmed) status = 3;
      if (statusWillUpdate.isDenied) status = 2;
      if (statusWillUpdate.isDismissed) return;
    }

    const result = await this.messageService.areYouSure(
      `¿Esta seguro que desea sacar al usuario ${parked.user_name} ${parked.user_last_name} del parqueo ${parked.parking_name}?`
    );
    if (result.isDenied) {
      this.messageService.Ok('!No te preocupes!, no se hicieron cambios.');
      return;
    }
    if (result.isConfirmed) {
      this.messageService.showLoading();
      this.parkingService
        .getOutParked(parked.parked_id, status)
        .then((data) => {
          if (data.success) {
            this.getParked();
            this.messageService.Ok(data.message);
          } else {
            this.messageService.error('', data.message);
          }
        })
        .then(() => {});
    }
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
