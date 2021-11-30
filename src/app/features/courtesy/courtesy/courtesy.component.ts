import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CourtesyService } from '../services/courtesy.service';
import { MessageService } from '../../../shared/services/message.service';
import { CourtesyModel, CourtesyTypeModel } from '../models/Courtesy.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../shared/services/utilities.service';
import { AuthService } from '../../../shared/services/auth.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableOptions } from '../../../shared/model/DataTableOptions';
import { saveAs } from 'file-saver';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-courtesy',
  templateUrl: './courtesy.component.html',
  styleUrls: ['./courtesy.component.css'],
})
export class CourtesyComponent implements OnInit, AfterViewInit, OnDestroy {
  listCourtesy = environment.listCourtesy;
  downloadCourtesy = environment.downloadCourtesy;
  createCourtesy = environment.createCourtesy;

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;

  courtesyTypes: CourtesyTypeModel[] = [];
  newCourtesyForm: FormGroup;
  parkingId: string = this.authService.getParking().id;
  courtesies: CourtesyModel[] = [];

  constructor(
    private courtesyService: CourtesyService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permisionService: PermissionsService
  ) {
    this.messageService.showLoading();
    this.formGroup = formBuilder.group({ filter: [''] });
    this.newCourtesyForm = this.createForm();
    this.getInitialData().then(() => {
      this.messageService.hideLoading();
    });
  }

  ngOnInit(): void {
    this.dtOptions = DataTableOptions.getSpanishOptions(10);
  }

  getTypeDescription(id: number) {
    let newDescription = this.courtesyTypes.find((x) => x.id == id);
    return newDescription == undefined
      ? new CourtesyTypeModel()
      : newDescription;
  }

  ifHaveAction(action: string) {
    return this.permisionService.ifHaveAction(action);
  }

  getInitialData() {
    return this.courtesyService
      .getTypes()
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.courtesyTypes = data.data.type;
          this.messageService.hideLoading();
        } else {
          this.messageService.errorTimeOut(
            '',
            'No se pudo cargar la información inicial. Intente mas tarde.'
          );
        }
      })
      .then(() => {
        return this.getCourtesies();
      })
      .then(() => {
        this.messageService.hideLoading();
      });
  }

  private createForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      value: ['', [Validators.required, Validators.min(1)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      parkingId: [this.authService.getParking().id],
    });
  }

  controlInvalid(control: string) {
    return this.utilitiesService.controlInvalid(this.newCourtesyForm, control);
  }

  getCourtesy(): CourtesyModel {
    return {
      name: this.newCourtesyForm.controls['name'].value,
      type: this.newCourtesyForm.controls['type'].value,
      value: this.newCourtesyForm.controls['value'].value,
      quantity: this.newCourtesyForm.controls['quantity'].value,
      parkingId: this.parkingId,
    };
  }

  getCourtesies() {
    return this.courtesyService
      .getCourtesys(this.parkingId)
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.courtesies = data.data;
          this.rerender();
        } else {
          this.messageService.error('', data.message);
        }
      });
  }

  saveCourtesy() {
    this.messageService.showLoading();
    if (this.newCourtesyForm.valid) {
      let newCourtesy: CourtesyModel = this.getCourtesy();
      this.courtesyService.saveCourtesy(newCourtesy).subscribe((data) => {
        if (data.success) {
          this.messageService.OkTimeOut();
        } else {
          this.messageService.error('', data.message);
        }
        this.getCourtesies().then(() => {
          this.messageService.hideLoading();
        });
      });
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

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  downloadPDF(courtesies: CourtesyModel) {
    this.messageService.showLoading();
    courtesies.id = !courtesies.id ? '' : courtesies.id;
    this.courtesyService.getPDF(courtesies.id).subscribe((data) => {
      saveAs(data, courtesies.name + '.pdf');
      this.messageService.OkTimeOut();
    });
  }
}
