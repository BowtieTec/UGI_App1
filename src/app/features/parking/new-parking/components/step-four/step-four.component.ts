import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../../../../../shared/services/message.service';
import { ParkingService } from '../../../services/parking.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';
import { SettingsOptionsModel } from '../../../models/SettingsOption.model';
import { CreateParkingStepFourModel } from '../../../models/CreateParking.model';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.css'],
})
export class StepFourComponent implements OnInit {
  @Input() stepFourForm!: FormGroup;
  @Output() changeStep = new EventEmitter<number>();
  settingsOptions!: SettingsOptionsModel;

  constructor(
    private message: MessageService,
    private parkingService: ParkingService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {
    this.settingsOptions = this.parkingService.settingsOptions;
  }

  ngOnInit(): void {}

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.stepFourForm, control);
  }

  emmitStep(number: number) {
    if (number == 1) {
      if (this.stepFourForm.valid) {
        this.parkingService.parkingStepFour = this.getStepFour();
        this.parkingService.parkingStepFour.parkingId =
          this.parkingService.parkingStepOne.parkingId;
        this.parkingService.setStepFour().subscribe((data) => {
          if (data.success) {
            this.changeStep.emit(number);
            this.message.OkTimeOut('Parqueo Guardado');
          } else {
            this.utilitiesService.markAsTouched(this.stepFourForm);
            this.message.error('', data.message);
          }
        });
      } else {
        this.message.errorTimeOut(
          '',
          'Datos faltantes o incorrectos. Validar que los datos sean correctos.'
        );
        this.utilitiesService.markAsTouched(this.stepFourForm);
      }
    } else {
      this.changeStep.emit(number);
    }
  }

  private getStepFour(): CreateParkingStepFourModel {
    try {
      return {
        parkingId: '',
        business_address: this.stepFourForm.controls['business_address'].value,
        business_name: this.stepFourForm.controls['business_name'].value,
        currency: this.stepFourForm.controls['currency'].value,
        is_our_bac_credential:
          this.stepFourForm.controls['is_our_bac_credential'].value,
        is_our_visa_credential:
          this.stepFourForm.controls['is_our_visa_credential'].value,
        nit: this.stepFourForm.controls['nit'].value,
        pay_method: this.stepFourForm.controls['pay_method'].value,
        visa_credential: {
          url: this.stepFourForm.controls['url_visa'].value,
          merchant_id: this.stepFourForm.controls['merchant_id_visa'].value,
          transaction_key:
            this.stepFourForm.controls['transaction_key_visa'].value,
        },
        bac_credential: {
          url: this.stepFourForm.controls['url_bac'].value,
          merchant_id: this.stepFourForm.controls['merchant_id_bac'].value,
          acquirer_id: this.stepFourForm.controls['acquirer_id_bac'].value,
          pmtnpssw: this.stepFourForm.controls['pmtnpssw_bac'].value,
          purchase_currency:
            this.stepFourForm.controls['purchase_currency_bac'].value,
        },
      };
    } catch (e) {
      throw e;
    }
  }
}
