import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CreateParkingFileModel } from 'src/app/features/parking/models/CreateParking.model'
import { SettingsOptionsModel } from 'src/app/features/parking/models/SettingsOption.model'
import { ParkingService } from 'src/app/features/parking/services/parking.service'
import { MessageService } from 'src/app/shared/services/message.service'
import { UtilitiesService } from 'src/app/shared/services/utilities.service'
import { RegisterPublicFormService } from '../../services/register-public-form.service'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  filesPlans: string[] = []
  fileTariff!: File
  fileLogo!: File

  stepFourForm: FormGroup = this.createForm()
  @Output() changeStep = new EventEmitter<number>()
  settingsOptions!: SettingsOptionsModel
  @Input() parkingId: string = this.parkingService.parkingStepOne.parkingId

  constructor(
    private message: MessageService,
    private parkingService: ParkingService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private fileServices: RegisterPublicFormService
  ) {
    this.settingsOptions = this.parkingService.settingsOptions
  }

  ngOnInit(): void {}

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.stepFourForm, control)
  }

  async emmitStep(number: number) {
    this.message.showLoading()
    if (number == 1) {
      if (this.filesPlans) {
        //Plans------------------------------------------
        const formData = new FormData()
        for (let i = 0; i < this.filesPlans.length; i++) {
          formData.append('plans', this.filesPlans[i])
        }
        await this.fileServices
          .UploadPlans(formData, this.parkingId)
          .toPromise()
          .then((res) => {})
          .catch((err: any) => console.log(err))
      }
      if (this.fileTariff) {
        //Tariff-----------------------------------------
        const formDataTariff = new FormData()
        formDataTariff.append('rate', this.fileTariff)
        await this.fileServices
          .UploadTariff(formDataTariff, this.parkingId)
          .toPromise()
          .then((res: any) => {})
          .catch((err: any) => this.message.OkTimeOut(err.message))
      }

      if (this.fileLogo) {
        //LOGO----------------------------------------
        const formDataLogo = new FormData()
        formDataLogo.append('logo', this.fileLogo)
        await this.fileServices
          .UploadLogo(formDataLogo, this.parkingId)
          .toPromise()
          .then((res) => {})
          .catch((err: any) => this.message.OkTimeOut(err.message))
      } else {
      }
    }
    this.message.hideLoading()
    this.changeStep.emit(number)
  }

  createForm() {
    return this.formBuilder.group({
      logo: [null, Validators.required],
      rate: [null, Validators.required],
      plans: [null, Validators.required]
    })
  }

  private getFile(): CreateParkingFileModel {
    return {
      parkingId: '',
      logo: this.stepFourForm.controls['logo'].value,
      rate: this.stepFourForm.controls['rate'].value,
      plans: this.stepFourForm.controls['plans'].value
    }
  }

  onFileChangePlans(event: any) {
    for (let i = 0; i < event.target.files.length; i++) {
      this.filesPlans.push(event.target.files[i])
    }
  }

  onFileChangeLogo(event: any) {
    this.fileLogo = event.target.files[0]
  }

  onFileChangeTarif(event: any) {
    this.fileTariff = event.target.files[0]
  }
}
