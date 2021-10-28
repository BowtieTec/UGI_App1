import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import {
  AccessModel,
  CreateParkingStepFiveModel,
  CreateParkingStepFourModel,
  CreateParkingStepTwoModel,
} from '../models/CreateParking.model';

import { ParkingService } from '../services/parking.service';
import { SettingsOptionsModel } from '../models/SettingsOption.model';

import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
  selector: 'app-new-parking',
  templateUrl: './new-parking.component.html',
  styleUrls: ['./new-parking.component.css'],
})
export class NewParkingComponent implements OnInit {
  newParkingForm!: FormGroup;
  totalSteps = 6;
  step = 1;

  accessList: AccessModel[] = [];
  settingsOptions!: SettingsOptionsModel;

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService
  ) {
    this.newParkingForm = this.createForm();
    this.getInitialData();
  }

  ngOnInit(): void {}

  get antennas() {
    return this.newParkingForm.get('antennas') as FormArray;
  }

  get stepOneForm() {
    return this.newParkingForm.get('stepOne') as FormGroup;
  }

  changeStep(number: number) {
    this.step + number > this.totalSteps
      ? (this.step = 1)
      : this.step + number == 0
      ? (this.step = this.totalSteps)
      : (this.step = this.step + number);
    console.log(this.parkingService.parkingStepOne);
  }

  controlInvalid(control: string) {
    return (
      this.newParkingForm.get(control)?.invalid &&
      this.newParkingForm.get(control)?.touched
    );
  }

  FormArrayInvalid(control: string, i: number) {
    return (
      this.antennas.controls[i].get(control)?.invalid &&
      this.antennas.controls[i].get(control)?.touched
    );
  }

  saveParking() {
    this.message.showLoading();

    if (this.newParkingForm.invalid) {
      this.message.errorTimeOut(
        '',
        'Valide que todos los datos estén correctamente llenados'
      );
    } else {
      this.parkingService.parkingStepTwo = this.getStepTwo();
      this.parkingService.parkingStepFour = this.getStepFour();
      this.parkingService.parkingStepFive = this.getStepFive();
    }
    this.utilitiesService.markAsTouched(this.newParkingForm);
  }

  private getInitialData() {
    this.message.showLoading();
    this.accessList = this.parkingService.getAccesses();
    this.parkingService
      .getSettingsOptions()
      .subscribe((result: SettingsOptionsModel) => {
        this.parkingService.settingsOptions = result;
        this.settingsOptions = this.parkingService.settingsOptions;
        this.message.hideLoading();
      });
  }

  private createForm() {
    return this.formBuilder.group({
      /*-- First Step --*/
      stepOne: this.formBuilder.group({
        name: [this.parkingService.parkingStepOne.name, Validators.required],
        address: [
          this.parkingService.parkingStepOne.address,
          Validators.required,
        ],
        parking_spaces: [
          this.parkingService.parkingStepOne.parking_spaces == 0
            ? ''
            : this.parkingService.parkingStepOne.parking_spaces,
          [Validators.required, Validators.min(0)],
        ],
        special_parking_spaces: [
          this.parkingService.parkingStepOne.special_parking_spaces == 0
            ? ''
            : this.parkingService.parkingStepOne.special_parking_spaces,
          [Validators.required, Validators.min(0)],
        ],
        minutes_to_exit: [
          this.parkingService.parkingStepOne.minutes_to_exit == 0
            ? ''
            : this.parkingService.parkingStepOne.special_parking_spaces,
          [Validators.required, Validators.min(0)],
        ],
        rules: [this.parkingService.parkingStepOne.rules, Validators.required],
        is_show_map: [this.parkingService.parkingStepOne.is_show_map],
        country: [
          this.parkingService.parkingStepOne.country,
          [Validators.required, Validators.min(1)],
        ],
      }),
      /*-- Second Step-- */
      //Monday
      isOpen0: [true],
      openning_time0: ['00:00:00'],
      closing_time0: ['00:00:00'],
      //Tuesday
      isOpen1: [true],
      openning_time1: ['00:00:00'],
      closing_time1: ['00:00:00'],
      //Wednesday
      isOpen2: [true],
      openning_time2: ['00:00:00'],
      closing_time2: ['00:00:00'],
      //Thursday
      isOpen3: [true],
      openning_time3: ['00:00:00'],
      closing_time3: ['00:00:00'],
      //Friday
      isOpen4: [true],
      openning_time4: ['00:00:00'],
      closing_time4: ['00:00:00'],
      //Saturday
      isOpen5: [true],
      openning_time5: ['00:00:00'],
      closing_time5: ['00:00:00'],
      //Sunday
      isOpen6: [true],
      openning_time6: ['00:00:00'],
      closing_time6: ['00:00:00'],
      /*-- Fourth Step-- */
      nit: [''],
      business_address: [''],
      business_name: [''],
      pay_method: [0],
      currency: [0],
      is_our_visa_credential: false,
      is_our_bac_credential: false,
      //Visa Credential
      merchant_id_visa: [''],
      transaction_key_visa: [''],
      url_visa: [''],
      //  BAC Credential
      merchant_id_bac: [''],
      acquirer_id_bac: [''],
      purchase_currency_bac: [0],
      pmtnpssw_bac: [''],
      url_bac: [''],
      /* ---Five Step--- */
      antennas: this.formBuilder.array([this.createAccess()]),
    });
  }

  private getStepTwo(): CreateParkingStepTwoModel {
    try {
      return {
        parkingId: '',
        schedules: [
          {
            isOpen: this.newParkingForm.controls['isOpen0'].value,
            day: 0,
            openning_time: {
              hour: this.newParkingForm.controls['openning_time0'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['openning_time0'].value.split(
                  ':'
                )[1],
              second: '00',
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time0'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time0'].value.split(
                  ':'
                )[1],
              second: '00',
            },
          },
          {
            isOpen: this.newParkingForm.controls['isOpen1'].value,
            day: 1,
            openning_time: {
              hour: this.newParkingForm.controls['openning_time1'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['openning_time1'].value.split(
                  ':'
                )[1],
              second: '00',
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time1'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time1'].value.split(
                  ':'
                )[1],
              second: '00',
            },
          },
          {
            isOpen: this.newParkingForm.controls['isOpen2'].value,
            day: 2,
            openning_time: {
              hour: this.newParkingForm.controls['openning_time2'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['openning_time2'].value.split(
                  ':'
                )[1],
              second: '00',
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time2'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time2'].value.split(
                  ':'
                )[1],
              second: '00',
            },
          },
          {
            isOpen: this.newParkingForm.controls['isOpen3'].value,
            day: 3,
            openning_time: {
              hour: this.newParkingForm.controls['openning_time3'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['openning_time3'].value.split(
                  ':'
                )[1],
              second: '00',
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time3'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time3'].value.split(
                  ':'
                )[1],
              second: '00',
            },
          },
          {
            isOpen: this.newParkingForm.controls['isOpen4'].value,
            day: 4,
            openning_time: {
              hour: this.newParkingForm.controls['openning_time4'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['openning_time4'].value.split(
                  ':'
                )[1],
              second: '00',
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time4'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time4'].value.split(
                  ':'
                )[1],
              second: '00',
            },
          },
          {
            isOpen: this.newParkingForm.controls['isOpen5'].value,
            day: 5,
            openning_time: {
              hour: this.newParkingForm.controls['openning_time5'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['openning_time5'].value.split(
                  ':'
                )[1],
              second: '00',
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time5'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time5'].value.split(
                  ':'
                )[1],
              second: '00',
            },
          },
          {
            isOpen: this.newParkingForm.controls['isOpen6'].value,
            day: 6,
            openning_time: {
              hour: this.newParkingForm.controls['openning_time6'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['openning_time6'].value.split(
                  ':'
                )[1],
              second: '00',
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time6'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time6'].value.split(
                  ':'
                )[1],
              second: '00',
            },
          },
        ],
      };
    } catch (e) {
      throw e;
    }
  }

  private getStepFour(): CreateParkingStepFourModel {
    try {
      return {
        parkingId: '',
        business_address:
          this.newParkingForm.controls['business_address'].value,
        business_name: this.newParkingForm.controls['business_name'].value,
        currency: this.newParkingForm.controls['currency'].value,
        is_our_bac_credential:
          this.newParkingForm.controls['is_our_bac_credential'].value,
        is_our_visa_credential:
          this.newParkingForm.controls['is_our_visa_credential'].value,
        nit: this.newParkingForm.controls['nit'].value,
        pay_method: this.newParkingForm.controls['pay_method'].value,
        visa_credential: {
          url: this.newParkingForm.controls['url_visa'].value,
          merchant_id: this.newParkingForm.controls['merchant_id_visa'].value,
          transaction_key:
            this.newParkingForm.controls['transaction_key_visa'].value,
        },
        bac_credential: {
          url: this.newParkingForm.controls['url_bac'].value,
          merchant_id: this.newParkingForm.controls['merchant_id_bac'].value,
          acquirer_id: this.newParkingForm.controls['acquirer_id_bac'].value,
          pmtnpssw: this.newParkingForm.controls['pmtnpssw_bac'].value,
          purchase_currency:
            this.newParkingForm.controls['purchase_currency_bac'].value,
        },
      };
    } catch (e) {
      throw e;
    }
  }

  private getStepFive(): CreateParkingStepFiveModel[] {
    let antennas: CreateParkingStepFiveModel[] = [];
    this.antennas.value.forEach((antenna: any) =>
      antennas.push({
        parking: '',
        name: antenna.name_access,
        type: antenna.type_access,
        antena: antenna.antenna_access,
        mac: antenna.mac_access,
      })
    );
    return antennas;
  }

  //* Start Google Maps */

  createAccess(): FormGroup {
    return this.formBuilder.group({
      type_access: [0, Validators.required],
      name_access: ['', Validators.required],
      mac_access: ['', Validators.required],
      antenna_access: ['', Validators.required],
    });
  }

  /* End Google Maps */
  addAntenna() {
    if (this.antennas.invalid) {
      this.message.warningTimeOut(
        'No ha llenado todos los datos. Para continuar porfavor llene los datos necesarios.'
      );
      Object.values(this.antennas.controls).forEach((group) => {
        Object.values((group as FormArray).controls).forEach((control) => {
          control.markAsTouched();
        });
      });
    } else {
      this.antennas.push(this.createAccess());
    }
  }
}
