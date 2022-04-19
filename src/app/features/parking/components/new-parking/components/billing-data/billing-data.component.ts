import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MessageService } from '../../../../../../shared/services/message.service'
import { ParkingService } from '../../../../services/parking.service'
import { UtilitiesService } from '../../../../../../shared/services/utilities.service'
import { SettingsOptionsModel } from '../../../../models/SettingsOption.model'
import { CreateParkingStepFourModel } from '../../../../models/CreateParking.model'
import { Router } from '@angular/router'

@Component({
  selector: 'app-billing-data',
  templateUrl: './billing-data.component.html',
  styleUrls: ['./billing-data.component.css']
})
export class BillingDataComponent {
  stepFourForm: FormGroup = this.createForm()
  @Output() changeStep = new EventEmitter<number>()
  settingsOptions!: SettingsOptionsModel
  @Input() parkingId!: string
  @Input() showNavigationButtons = true
  @Input() isPublic = false

  constructor(
    private message: MessageService,
    private parkingService: ParkingService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private route: Router
  ) {
    this.settingsOptions = this.parkingService.settingsOptions
  }

  get isVisaSelected() {
    const selected = this.stepFourForm.get('pay_method')?.value
    return selected != 1 && selected
  }

  get isBacSelected() {
    const selected = this.stepFourForm.get('pay_method')?.value
    return selected != 0 && selected
  }

  addValidators() {
    if (this.stepFourForm.controls['is_our_visa_credential'].value) {
      this.stepFourForm.controls['merchant_id_visa'].setValidators(
        Validators.required
      )
      this.stepFourForm.controls['merchant_pass_visa'].setValidators(
        Validators.required
      )
      this.stepFourForm.controls['afiliacion'].setValidators(
        Validators.required
      )
      this.stepFourForm.controls['terminal'].setValidators(Validators.required)
    } else {
      this.stepFourForm.controls['merchant_id_visa'].clearValidators()
      this.stepFourForm.controls['merchant_pass_visa'].clearValidators()
      this.stepFourForm.controls['afiliacion'].clearValidators()
      this.stepFourForm.controls['terminal'].clearValidators()
      this.stepFourForm.controls['merchant_id_visa'].setErrors(null)
      this.stepFourForm.controls['merchant_pass_visa'].setErrors(null)
      this.stepFourForm.controls['afiliacion'].setErrors(null)
      this.stepFourForm.controls['terminal'].setErrors(null)
    }
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.stepFourForm, control)
  }

  async emmitStep(number: number) {
    this.stepFourForm.updateValueAndValidity()
    this.message.showLoading()
    if (number == 1) {
      if (this.stepFourForm.valid) {
        this.parkingService.parkingStepFour = this.getStepFour()
        this.parkingService.parkingStepFour.parkingId = this.parkingId
        this.parkingService.setStepFour().subscribe((data) => {
          if (data.success) {
            this.message.Ok('Parqueo guardado.')
            if (this.showNavigationButtons && !this.isPublic) {
              this.changeStep.emit(number)
            } else {
              this.endToken()
              this.route.navigate(['/']).catch()
            }
          } else {
            this.utilitiesService.markAsTouched(this.stepFourForm)
            this.message.error('', data.message)
          }
        })
      } else {
        this.message.errorTimeOut(
          '',
          'Datos faltantes o incorrectos. Validar que los datos sean correctos.'
        )
        this.utilitiesService.markAsTouched(this.stepFourForm)
      }
    } else {
      this.message.hideLoading()
      this.changeStep.emit(number)
    }
  }

  private async endToken() {
    return this.parkingService.endTempToken().toPromise().then()
  }

  createForm() {
    return this.formBuilder.group({
      nit: [null, [Validators.required, this.utilitiesService.validateNIT]],
      business_address: [null, Validators.required],
      business_name: [null, Validators.required],
      pay_method: ['0'],
      currency: [null, Validators.required],
      is_our_visa_credential: false,
      is_our_bac_credential: false,
      //Visa Credential
      merchant_id_visa: [''],
      merchant_pass_visa: [''],
      afiliacion: [''],
      terminal: [''],
      //  BAC Credential
      merchant_id_bac: [null],
      acquirer_id_bac: [null],
      purchase_currency_bac: [null],
      pmtnpssw_bac: [null],
      url_bac: [null]
    })
  }

  private getStepFour(): CreateParkingStepFourModel {
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
        cardAcqId: this.stepFourForm.controls['afiliacion'].value,
        terminal: this.stepFourForm.controls['terminal'].value,
        merchant_user: this.stepFourForm.controls['merchant_id_visa'].value,
        merchant_password:
        this.stepFourForm.controls['merchant_pass_visa'].value
      },
      bac_credential: {
        url: this.stepFourForm.controls['url_bac'].value,
        merchant_id: this.stepFourForm.controls['merchant_id_bac'].value,
        acquirer_id: this.stepFourForm.controls['acquirer_id_bac'].value,
        pmtnpssw: this.stepFourForm.controls['pmtnpssw_bac'].value,
        purchase_currency:
        this.stepFourForm.controls['purchase_currency_bac'].value
      }
    }
  }
}
