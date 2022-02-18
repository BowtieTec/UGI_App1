import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ParkingService} from '../../services/parking.service';
import {ParkedModel, ParkingModel, StatusParked,} from '../../models/Parking.model';
import {AuthService} from '../../../../shared/services/auth.service';
import {DataTableDirective} from 'angular-datatables';
import {DataTableOptions} from '../../../../shared/model/DataTableOptions';
import {Subject} from 'rxjs';
import {MessageService} from '../../../../shared/services/message.service';
import {environment} from '../../../../../environments/environment';
import {PermissionsService} from '../../../../shared/services/permissions.service';

@Component({
  selector: 'app-parked',
  templateUrl: './parked.component.html',
  styleUrls: ['./parked.component.css'],
})
export class ParkedComponent implements OnDestroy, AfterViewInit, OnInit {
  parkedForm: FormGroup = this.createForm();
  parkingData: ParkingModel[] = [];
  parkedData: Array<ParkedModel> = [];
  statusParked = StatusParked;

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup = this.formBuilder.group({filter: ['']});

  getOutWithPayment = environment.getOutWithPaymentDoneParkedParking;
  getOutWithoutPayment = environment.getOutWithoutPaymentDoneParkedParking;
  private actions: string[] = this.permissionService.actionsOfPermissions;

  constructor(
    private formBuilder: FormBuilder,
    private parkingService: ParkingService,
    private authService: AuthService,
    private messageService: MessageService,
    private permissionService: PermissionsService
  ) {
    this.getInitialData();
  }

  async getInitialData() {
    this.messageService.showLoading();
    await this.getAllParking();
    if (this.isSudo) {
      await this.parkedForm.get('parkingId')?.setValue(this.authService.getParking().id)
    }
    // await this.getParked().then(() => this.messageService.hideLoading());
  }

  get isSudo() {
    return this.authService.isSudo;
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      parkingId: ['0'],
      status: ['1'],
      textToSearch: ['']
    });
  }

  getParkedServerSideOptions() {
    return {
      language: DataTableOptions.language,
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.messageService.showLoading();
        this.parkingService.getParked(this.getParkedFormValues(), dataTablesParameters.draw, dataTablesParameters.length).subscribe(resp => {
          this.parkedData = resp.data;
          callback({
            recordsTotal: resp.data.recordsTotal,
            recordsFiltered: resp.data.recordsFiltered,
            data: []
          })
          this.messageService.hideLoading();
        })
      }
    }
  }

  async getAllParking() {
    if (!this.authService.isSudo) {
      return;
    }
    return this.parkingService.getAllParking().then((data) => {
      if (data.success) {
        this.parkingData = data.data.parkings;
      }
    });
  }

  getParkedFormValues() {
    const status = this.parkedForm.get('status')?.value != "" ? this.parkedForm.get('status')?.value : '1';
    const parkingId = this.isSudo && this.parkedForm.get('parkingId')?.value != "0"
      ? this.parkedForm.get('parkingId')?.value
      : this.authService.getParking().id;
    const textToSearch = this.parkedForm.get('textToSearch')?.value
    return {
      status,
      parkingId,
      textToSearch
    };
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action);
  }

  async getStatusToSave(parked_type: number) {
    let status = 3;
    if (parked_type == 0) {
      if (this.ifHaveAction(this.getOutWithoutPayment)) {
        status = 2;
      }
      if (
        this.ifHaveAction(this.getOutWithoutPayment) &&
        this.ifHaveAction(this.getOutWithPayment)
      ) {
        const statusWillUpdate = await this.messageService.areYouSureWithCancel(
          '¿Dejar salir a usuario con el cobro pendiente o cancelado?',
          'Cobro Cancelado',
          'Cobrar parqueo'
        );
        if (statusWillUpdate.isConfirmed) status = 3;
        if (statusWillUpdate.isDenied) status = 2;
        if (statusWillUpdate.isDismissed) return -1;
      }
    }
    return status;
  }

  async getOut(parked: ParkedModel) {
    if (parked.type) {
      this.messageService.error(
        'Este parqueo no tiene un tipo de parqueo valido.'
      );
      return;
    }
    const status = await this.getStatusToSave(parked.type);
    if (status == -1) {
      return;
    }
    const result = await this.messageService.areYouSure(
      `¿Esta seguro que desea sacar al usuario ${parked.user_name} ${parked.last_name} del parqueo ${parked.parking}?`
    );
    if (result.isDenied) {
      this.messageService.infoTimeOut(
        '!No te preocupes!, no se hicieron cambios.'
      );
      return;
    }
    if (result.isConfirmed) {
      this.messageService.showLoading();
      this.parkingService
        .getOutParked(parked.id, status!)
        .then((data) => {
          if (data.success) {
            this.rerender();
            this.messageService.Ok(data.message);
          } else {
            this.messageService.error('', data.message);
          }
        });
    }
  }

  rerender() {
    if (this.dtElement != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }

  ngOnInit(): void {
    const that = this;
    this.dtOptions = {
      destroy: true,
      responsive: true,
      language: DataTableOptions.language,
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      pageLength: 10,
      ajax: (dataTablesParameters: any, callback: any) => {
        this.messageService.showLoading();
        that.parkingService.getParked(this.getParkedFormValues(), dataTablesParameters.draw, dataTablesParameters.length).subscribe(resp => {
          that.parkedData = resp.data;
          console.log(resp.data);
          callback({
            recordsTotal: resp.recordsTotal,
            recordsFiltered: resp.recordsFiltered,
            data: []
          });
          this.messageService.hideLoading();
        })
      },
      columns: [{data: 'phone_number', orderable: true}, {data: 'entry_date'}, {data: 'status'}, {data: 'type'}, {
        data: 'parking',
        visible: this.isSudo,

      }, {data: 'none'}]
    }
    this.messageService.hideLoading();
  }
}
