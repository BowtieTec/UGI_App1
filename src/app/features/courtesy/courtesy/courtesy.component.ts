import { Component, OnInit } from '@angular/core';
import { CourtesyService } from '../services/courtesy.service';
import { MessageService } from '../../../shared/services/message.service';
import { CourtesyModel, CourtesyTypeModel } from '../models/Courtesy.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../shared/services/utilities.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-courtesy',
  templateUrl: './courtesy.component.html',
  styleUrls: ['./courtesy.component.css'],
})
export class CourtesyComponent implements OnInit {
  courtesyTypes: CourtesyTypeModel[] = [];
  newCourtesyForm: FormGroup;
  parkingId: string = this.authService.getParking().id;
  courtesys: CourtesyModel[] = [];

  constructor(
    private courtesyService: CourtesyService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private authService: AuthService
  ) {
    this.messageService.showLoading();
    this.newCourtesyForm = this.createForm();
    this.getInitialData().then(() => {
      console.log(this.courtesys);
      this.messageService.hideLoading();
    });
  }

  ngOnInit(): void {}

  getTypeDescription(id: number) {
    return this.courtesyTypes.find((x) => x.id == id);
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
        this.courtesyService
          .getCourtesys(this.parkingId)
          .toPromise()
          .then((data) => {
            console.log(data);
            if (data.success) {
              this.courtesys = data.data;
            } else {
              this.messageService.error('', data.message);
            }
          });
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
    try {
      return {
        name: this.newCourtesyForm.controls['name'].value,
        type: this.newCourtesyForm.controls['type'].value,
        value: this.newCourtesyForm.controls['value'].value,
        quantity: this.newCourtesyForm.controls['quantity'].value,
        parkingId: this.parkingId,
      };
    } catch (e) {
      throw e;
    }
  }

  getCourtesys() {}

  saveCourtesy() {
    this.messageService.showLoading();
    if (this.newCourtesyForm.valid) {
      let newCourtesy: CourtesyModel = this.getCourtesy();
      console.log(newCourtesy);
      this.courtesyService.saveCourtesy(newCourtesy).subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.messageService.OkTimeOut();
        } else {
          this.messageService.error('', data.message);
        }
        this.messageService.hideLoading();
      });
    }
  }
}
