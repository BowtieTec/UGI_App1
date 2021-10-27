import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import {
  AccessModel,
  CreateParkingStepFourModel,
  CreateParkingStepOneModel,
  CreateParkingStepTwoModel,
} from '../models/CreateParking.model';
import { ResponseModel } from '../../../shared/model/Request.model';
import { CountriesModel } from '../models/Countries.model';
import { ParkingService } from '../services/parking.service';
import { SettingsOptionsModel } from '../models/SettingsOption.model';

@Component({
  selector: 'app-new-parking',
  templateUrl: './new-parking.component.html',
  styleUrls: ['./new-parking.component.css'],
})
export class NewParkingComponent implements OnInit {
  newParkingForm!: FormGroup;
  totalSteps = 6;
  step = 1;
  coords = { lat: 0, lng: 0 };
  coordsMark = { lat: 0, lng: 0 };
  parkingStepOne!: CreateParkingStepOneModel;
  parkingStepTwo!: CreateParkingStepTwoModel;
  countries: CountriesModel[] = [];
  accessList: AccessModel[] = [];
  parkingStepFour!: CreateParkingStepFourModel;
  settingsOptions!: SettingsOptionsModel;

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getInitialData();
  }

  get antennas() {
    return this.newParkingForm.get('antennas') as FormArray;
  }

  changeStep(number: number) {
    this.step + number > this.totalSteps
      ? (this.step = 1)
      : this.step + number == 0
      ? (this.step = this.totalSteps)
      : (this.step = this.step + number);
  }

  controlInvalid(control: string) {
    return (
      this.newParkingForm.get(control)?.invalid &&
      this.newParkingForm.get(control)?.touched
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
      this.parkingStepOne = this.getStepOne();
      this.parkingStepTwo = this.getStepTwo();
      this.parkingStepFour = this.getStepFour();
      this.parkingService.saveParkingSteps(
        this.parkingStepOne,
        this.parkingStepTwo,
        this.parkingStepFour
      );
    }
    Object.values(this.newParkingForm.controls).forEach((control) =>
      control.markAsTouched()
    );
  }

  private getInitialData() {
    this.message.showLoading();
    this.getPosition()
      .then((r) => (this.coords = { ...r }))
      .then(() => {
        this.parkingService
          .getCountries()
          .subscribe((data: ResponseModel) =>
            data.data.forEach((country: CountriesModel) =>
              this.countries.push(country)
            )
          );
      })
      .then(() => {
        this.accessList = this.parkingService.getAccesses();
        console.log(this.accessList);
        return this.parkingService.getSettingsOptions();
      })
      .then((data) => {
        data.subscribe((result: SettingsOptionsModel) => {
          this.settingsOptions = result;
          console.log(this.settingsOptions);
        });
      })
      .then(() => this.message.hideLoading());
  }

  private createForm() {
    this.newParkingForm = this.formBuilder.group({
      /*-- First Step-- */
      name: ['', Validators.required],
      address: ['', Validators.required],
      parking_spaces: ['', [Validators.required, Validators.min(0)]],
      special_parking_spaces: ['', [Validators.required, Validators.min(0)]],
      minutes_to_exit: ['', [Validators.required, Validators.min(0)]],
      rules: [''],
      is_show_map: [false],
      country: [],
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

  private getStepOne(): CreateParkingStepOneModel {
    try {
      return {
        address: this.newParkingForm.controls['address'].value,
        coordinates: {
          latitude: this.coordsMark.lat,
          longitude: this.coordsMark.lng,
        },
        country: this.newParkingForm.controls['country'].value,
        is_show_map: this.newParkingForm.controls['is_show_map'].value,
        minutes_to_exit: this.newParkingForm.controls['minutes_to_exit'].value,
        name: this.newParkingForm.controls['name'].value,
        parking_spaces: this.newParkingForm.controls['parking_spaces'].value,
        rules: this.newParkingForm.controls['rules'].value,
        special_parking_spaces:
          this.newParkingForm.controls['special_parking_spaces'].value,
      };
    } catch (e) {
      throw e;
    }
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
              second:
                this.newParkingForm.controls['openning_time0'].value.split(
                  ':'
                )[2],
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time0'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time0'].value.split(
                  ':'
                )[1],
              second:
                this.newParkingForm.controls['closing_time0'].value.split(
                  ':'
                )[2],
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
              second:
                this.newParkingForm.controls['openning_time1'].value.split(
                  ':'
                )[2],
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time1'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time1'].value.split(
                  ':'
                )[1],
              second:
                this.newParkingForm.controls['closing_time1'].value.split(
                  ':'
                )[2],
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
              second:
                this.newParkingForm.controls['openning_time2'].value.split(
                  ':'
                )[2],
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time2'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time2'].value.split(
                  ':'
                )[1],
              second:
                this.newParkingForm.controls['closing_time2'].value.split(
                  ':'
                )[2],
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
              second:
                this.newParkingForm.controls['openning_time3'].value.split(
                  ':'
                )[2],
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time3'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time3'].value.split(
                  ':'
                )[1],
              second:
                this.newParkingForm.controls['closing_time3'].value.split(
                  ':'
                )[2],
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
              second:
                this.newParkingForm.controls['openning_time4'].value.split(
                  ':'
                )[2],
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time4'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time4'].value.split(
                  ':'
                )[1],
              second:
                this.newParkingForm.controls['closing_time4'].value.split(
                  ':'
                )[2],
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
              second:
                this.newParkingForm.controls['openning_time5'].value.split(
                  ':'
                )[2],
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time5'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time5'].value.split(
                  ':'
                )[1],
              second:
                this.newParkingForm.controls['closing_time5'].value.split(
                  ':'
                )[2],
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
              second:
                this.newParkingForm.controls['openning_time6'].value.split(
                  ':'
                )[2],
            },
            closing_time: {
              hour: this.newParkingForm.controls['closing_time6'].value.split(
                ':'
              )[0],
              minute:
                this.newParkingForm.controls['closing_time6'].value.split(
                  ':'
                )[1],
              second:
                this.newParkingForm.controls['closing_time6'].value.split(
                  ':'
                )[2],
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

  //* Start Google Maps */
  addMapMark(event: google.maps.MouseEvent) {
    this.coordsMark = { lat: event.latLng.lat(), lng: event.latLng.lng() };
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({
            lng: resp.coords.longitude,
            lat: resp.coords.latitude,
          });
        },
        (err) => reject(err)
      );
    });
  }

  createAccess(): FormGroup {
    return this.formBuilder.group({
      type_access: [0, [Validators.required]],
      name_access: ['', Validators.required],
      mac_access: ['', Validators.required],
      antenna_access: ['', Validators.required],
    });
  }

  /* End Google Maps */
  addAntenna() {
    this.antennas.push(this.createAccess());
    console.log(this.newParkingForm);
  }
}
