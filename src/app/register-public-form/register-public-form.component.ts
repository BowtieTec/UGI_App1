import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { SettingsOptionsModel } from '../features/parking/models/SettingsOption.model'
import { ParkingService } from '../features/parking/services/parking.service'
import { MessageService } from '../shared/services/message.service'
import { UtilitiesService } from '../shared/services/utilities.service'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-register-public-form',
  templateUrl: './register-public-form.component.html',
  styleUrls: ['./register-public-form.component.css']
})
export class RegisterPublicFormComponent implements OnInit {
  newParkingForm!: FormGroup
  totalSteps = 5
  step = 1
  settingsOptions!: SettingsOptionsModel

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService,
    private route: ActivatedRoute
  ) {
    this.newParkingForm = this.createForm()
    this.getInitialData()
  }

  ngOnInit(): void {}

  get parkingId() {
    return this.parkingService.parkingStepOne.parkingId
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
        this.parkingService.settingsOptions = result
        this.settingsOptions = this.parkingService.settingsOptions
        this.message.hideLoading()
      })
  }

  private createForm() {
    return this.formBuilder.group({
      /*-- First Step --*/
      /*stepOne: this.formBuilder.group(
        {
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
          rules: [
            this.parkingService.parkingStepOne.rules,
            Validators.required,
          ],
          is_show_map: [this.parkingService.parkingStepOne.is_show_map],
          country: [
            this.parkingService.parkingStepOne.country
              ? null
              : this.parkingService.parkingStepOne.country,
            [Validators.required, Validators.min(1)],
          ],
        },
        { validators: [NumberParkingGreaterValidations()] }
      ),*/
      /*-- Second Step-- */
      /*stepTwo: this.formBuilder.group({
        //Monday
        isOpen0: [{ value: true, disabled: true }],
        openning_time0: ['06:00:00'],
        closing_time0: ['00:00:00'],
        //Tuesday
        isOpen1: [{ value: true, disabled: true }],
        openning_time1: ['06:00:00'],
        closing_time1: ['00:00:00'],
        //Wednesday
        isOpen2: [{ value: true, disabled: true }],
        openning_time2: ['06:00:00'],
        closing_time2: ['00:00:00'],
        //Thursday
        isOpen3: [{ value: true, disabled: true }],
        openning_time3: ['06:00:00'],
        closing_time3: ['00:00:00'],
        //Friday
        isOpen4: [{ value: true, disabled: true }],
        openning_time4: ['06:00:00'],
        closing_time4: ['00:00:00'],
        //Saturday
        isOpen5: [{ value: true, disabled: true }],
        openning_time5: ['06:00:00'],
        closing_time5: ['00:00:00'],
        //Sunday
        isOpen6: [{ value: true, disabled: true }],
        openning_time6: ['06:00:00'],
        closing_time6: ['00:00:00'],
      }),*/
      /*-- Fourth Step-- */
      /*stepFour: this.formBuilder.group({
        nit: [null, [Validators.required, this.utilitiesService.validateNIT]],
        business_address: [null, Validators.required],
        business_name: [null, Validators.required],
        pay_method: [null, Validators.required],
        currency: [null, Validators.required],
        is_our_visa_credential: false,
        is_our_bac_credential: false,
        //Visa Credential
        merchant_id_visa: [null],
        transaction_key_visa: [null],
        url_visa: [null],
        //  BAC Credential
        merchant_id_bac: [null],
        acquirer_id_bac: [null],
        purchase_currency_bac: [null],
        pmtnpssw_bac: [null],
        url_bac: [null],
      }),*/
      /* ---Five Step--- */
      /*stepFive: this.formBuilder.group({
        type_access: [null, Validators.required],
        name_access: [null, Validators.required],
        mac_access: [null, Validators.required],
        antenna_access: [null, Validators.required],
        isPrivate: [false],
      }),*/
    })
  }
}
