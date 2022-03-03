import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsOptionsModel } from '../features/parking/models/SettingsOption.model';
import { ParkingService } from '../features/parking/services/parking.service';
import { MessageService } from '../shared/services/message.service';
import { UtilitiesService } from '../shared/services/utilities.service';

@Component({
  selector: 'app-register-public-form',
  templateUrl: './register-public-form.component.html',
  styleUrls: ['./register-public-form.component.css']
})
export class RegisterPublicFormComponent  {

  newParkingForm!: FormGroup
  totalSteps = 3
  step = 1

  settingsOptions!: SettingsOptionsModel

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService
  ) {
    this.getInitialData()
  }

  get parkingId() {
    return this.parkingService.parkingStepOne.parkingId
  }

  get stepOneForm() {
    return this.newParkingForm.get('stepOne') as FormGroup
  }

  get stepTwoForm() {
    return this.newParkingForm.get('stepTwo') as FormGroup
  }

  get stepThreeForm() {
    return this.newParkingForm.get('stepThree') as FormGroup
  }

  get stepFourForm() {
    return this.newParkingForm.get('stepFour') as FormGroup
  }

  get stepFiveForm() {
    return this.newParkingForm.get('stepFive') as FormGroup
  }

  changeStep(number: number) {
    this.step = this.step + number
  }

  saveParking() {
    this.message.showLoading()
    this.message.OkTimeOut('Parqueo guardado')
  }

  private getInitialData() {
    this.message.showLoading()
    this.parkingService
      .getSettingsOptions()
      .subscribe((result: SettingsOptionsModel) => {
        console.log("settingOptions", result);
        this.parkingService.settingsOptions = result
        this.settingsOptions = this.parkingService.settingsOptions
        this.message.hideLoading()
      })
  }

}
