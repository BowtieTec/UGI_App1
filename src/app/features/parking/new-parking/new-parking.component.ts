import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
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

  get stepOneForm() {
    return this.newParkingForm.get('stepOne') as FormGroup;
  }

  get stepTwoForm() {
    return this.newParkingForm.get('stepTwo') as FormGroup;
  }

  get stepThreeForm() {
    return this.newParkingForm.get('stepThree') as FormGroup;
  }

  get stepFourForm() {
    return this.newParkingForm.get('stepFour') as FormGroup;
  }

  get stepFiveForm() {
    return this.newParkingForm.get('stepFive') as FormGroup;
  }

  ngOnInit(): void {
  }

  changeStep(number: number) {
    this.step + number > this.totalSteps
      ? (this.step = 1)
      : this.step + number == 0
        ? (this.step = this.totalSteps)
        : (this.step = this.step + number);
  }

  saveParking() {
    this.message.showLoading();

    this.message.OkTimeOut('Parqueo guardado');
  }

  private getInitialData() {
    this.message.showLoading();
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
      stepTwo: this.formBuilder.group({
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
      }),
      /*-- Fourth Step-- */
      stepFour: this.formBuilder.group({
        nit: ['', [Validators.required, this.utilitiesService.validateNIT]],
        business_address: ['', Validators.required],
        business_name: ['', Validators.required],
        pay_method: ['', Validators.required],
        currency: ['', Validators.required],
        is_our_visa_credential: false,
        is_our_bac_credential: false,
        //Visa Credential
        merchant_id_visa: [''],
        transaction_key_visa: [''],
        url_visa: [''],
        //  BAC Credential
        merchant_id_bac: [''],
        acquirer_id_bac: [''],
        purchase_currency_bac: [''],
        pmtnpssw_bac: [''],
        url_bac: [''],
      }),
      /* ---Five Step--- */
      stepFive: this.formBuilder.group({
        type_access: ['', Validators.required],
        name_access: ['', Validators.required],
        mac_access: ['', Validators.required],
        antenna_access: ['', Validators.required],
      }),
    });
  }
}
