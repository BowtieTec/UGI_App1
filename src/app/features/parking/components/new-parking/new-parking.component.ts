import {Component} from '@angular/core'
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms'
import {MessageService} from '../../../../shared/services/message.service'
import {ParkingService} from '../../services/parking.service'
import {SettingsOptionsModel} from '../../models/SettingsOption.model'
import {UtilitiesService} from '../../../../shared/services/utilities.service'

@Component({
  selector: 'app-new-parking',
  templateUrl: './new-parking.component.html',
  styleUrls: ['./new-parking.component.css']
})
export class NewParkingComponent {
  newParkingForm!: UntypedFormGroup
  totalSteps = 7
  step = 1

  settingsOptions!: SettingsOptionsModel

  constructor(
    private formBuilder: UntypedFormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService
  ) {
    this.newParkingForm = this.createForm()
    this.getInitialData()
  }

  get parkingId() {
    return this.parkingService.parkingStepOne.parkingId
  }

  get stepOneForm() {
    return this.newParkingForm.get('stepOne') as UntypedFormGroup
  }

  get stepTwoForm() {
    return this.newParkingForm.get('stepTwo') as UntypedFormGroup
  }

  get stepThreeForm() {
    return this.newParkingForm.get('stepThree') as UntypedFormGroup
  }

  get stepFourForm() {
    return this.newParkingForm.get('stepFour') as UntypedFormGroup
  }

  get stepFiveForm() {
    return this.newParkingForm.get('stepFive') as UntypedFormGroup
  }

  changeStep(number: number) {
    this.step = this.step + number
  }

  saveParking() {
    this.message.showLoading()
    this.parkingService.clearObjects()
    this.message.OkTimeOut('Parqueo guardado')
  }

  private getInitialData() {
    this.message.showLoading()
    this.parkingService
      .getSettingsOptions()
      .subscribe((result: SettingsOptionsModel) => {
        this.parkingService.settingsOptions = result
        this.settingsOptions = this.parkingService.settingsOptions
        this.message.hideLoading()
      })
  }

  private createForm() {
    return this.formBuilder.group({})
  }
}
