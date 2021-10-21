import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../../shared/services/message.service';
import { CreateParkingStepOneModel } from '../models/CreateParking.model';
import { RequestModel } from '../../../shared/model/Request.model';
import { CountriesModel } from '../models/countries.model';
import { ParkingService } from '../services/parking.service';

@Component({
  selector: 'app-new-parking',
  templateUrl: './new-parking.component.html',
  styleUrls: ['./new-parking.component.css'],
})
export class NewParkingComponent implements OnInit {
  newParkingForm!: FormGroup;
  totalSteps = 5;
  step = 1;
  coords = { lat: 0, lng: 0 };
  coordsMark = { lat: 0, lng: 0 };
  parkingStepOne!: CreateParkingStepOneModel;
  countries: CountriesModel[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getInitialData();
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

  saveParking() {
    this.message.showLoading();
    if (this.newParkingForm.invalid) {
      this.message.errorTimeOut(
        '',
        'Valide que todos los datos estén correctamente llenados'
      );
    } else {
      this.parkingStepOne = this.getStepOne();
      this.parkingService.setStepOne(this.parkingStepOne);
    }
    Object.values(this.newParkingForm.controls).forEach((control) =>
      control.markAsTouched()
    );
    this.message.hideLoading();
  }

  private getInitialData() {
    this.message.showLoading();
    this.getPosition()
      .then((r) => (this.coords = { ...r }))
      .then(() => {
        this.parkingService
          .getCountries()
          .subscribe((data: RequestModel) =>
            data.data.forEach((country) => this.countries.push(country))
          );
      })
      .then(() => this.message.hideLoading());
  }

  private createForm() {
    this.newParkingForm = this.formBuilder.group({
      /*-- First Step-- */
      name: ['', Validators.required],
      address: ['', Validators.required],
      parking_spaces: ['', Validators.required, Validators.min(0)],
      special_parking_spaces: ['', Validators.required, Validators.min(0)],
      minutes_to_exit: ['', Validators.required, Validators.min(0)],
      rules: [''],
      is_show_map: [false],
      country: [],
      /*-- Second Step-- */
      //Monday
      isOpen0: [false],
      opening_time0: ['00:00:00'],
      closing_time0: ['00:00:00'],
      //Tuesday
      isOpen1: [false],
      opening_time1: ['00:00:00'],
      closing_time1: ['00:00:00'],
      //Wednesday
      isOpen2: [false],
      opening_time2: ['00:00:00'],
      closing_time2: ['00:00:00'],
      //Thursday
      isOpen3: [false],
      opening_time3: ['00:00:00'],
      closing_time3: ['00:00:00'],
      //Friday
      isOpen4: [false],
      opening_time4: ['00:00:00'],
      closing_time4: ['00:00:00'],
      //Saturday
      isOpen5: [false],
      opening_time5: ['00:00:00'],
      closing_time5: ['00:00:00'],
      //Sunday
      isOpen6: [false],
      opening_time6: ['00:00:00'],
      closing_time6: ['00:00:00'],
      /*-- Fourth Step-- */
      nit: [''],
      business_address: [''],
      business_name: [''],
      pay_method: [0],
      currency: [0],
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
}
