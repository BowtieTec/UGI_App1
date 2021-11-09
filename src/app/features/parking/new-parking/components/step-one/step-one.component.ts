import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageService } from '../../../../../shared/services/message.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CountriesModel } from '../../../models/Countries.model';
import { ParkingService } from '../../../services/parking.service';
import { ResponseModel } from '../../../../../shared/model/Request.model';
import { CreateParkingStepOneModel } from '../../../models/CreateParking.model';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
})
export class StepOneComponent implements OnInit {
  @Input() stepOneForm!: FormGroup;
  @Output() changeStep = new EventEmitter<number>();
  coords = {
    lat: this.parkingService.parkingStepOne.coordinates.latitude,
    lng: this.parkingService.parkingStepOne.coordinates.longitude,
  };
  coordsMark = {
    lat: this.parkingService.parkingStepOne.coordinates.latitude,
    lng: this.parkingService.parkingStepOne.coordinates.longitude,
  };
  countries: CountriesModel[] = [];

  constructor(
    private message: MessageService,
    private parkingService: ParkingService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {}

  get ParkingId() {
    return this.parkingService.parkingStepOne.parkingId;
  }

  ngOnInit(): void {
    this.message.showLoading();
    this.getPosition()
      .then((r) => {
        if (this.coords.lng == 0 && this.coords.lat == 0) {
          this.coords = { ...r };
        }
      })
      .then(() => {
        return this.parkingService
          .getCountries()
          .toPromise()
          .then((data: ResponseModel) =>
            data.data.forEach((country: CountriesModel) => {
              this.countries.push(country);
            })
          );
      })
      .then((data) => {
        this.message.hideLoading();
      });
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.stepOneForm, control);
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

  emmitStep(number: number) {
    if (number == 1 && this.parkingService.parkingStepOne.parkingId == '') {
      if (this.stepOneForm.valid) {
        this.parkingService.parkingStepOne = this.getStepOne();
        this.parkingService.setStepOne().subscribe((data) => {
          if (data.success) {
            this.changeStep.emit(number);
            this.message.OkTimeOut('Parqueo Guardado');
            this.parkingService.parkingStepOne.parkingId = data.data.id;
            this.utilitiesService.disableForm(this.stepOneForm);
          } else {
            this.utilitiesService.markAsTouched(this.stepOneForm);
            this.message.error('', data.message);
          }
        });
      } else {
        this.message.errorTimeOut(
          '',
          'Datos faltantes o incorrectos. Validar que los datos sean correctos.'
        );
        this.utilitiesService.markAsTouched(this.stepOneForm);
      }
    } else {
      this.changeStep.emit(number);
    }
  }

  private getStepOne(): CreateParkingStepOneModel {
    try {
      return {
        parkingId: this.parkingService.parkingStepOne.parkingId,
        address: this.stepOneForm.controls['address'].value,
        coordinates: {
          latitude: this.coordsMark.lat,
          longitude: this.coordsMark.lng,
        },
        country: this.stepOneForm.controls['country'].value,
        is_show_map: this.stepOneForm.controls['is_show_map'].value,
        minutes_to_exit: this.stepOneForm.controls['minutes_to_exit'].value,
        name: this.stepOneForm.controls['name'].value,
        parking_spaces: this.stepOneForm.controls['parking_spaces'].value,
        rules: this.stepOneForm.controls['rules'].value,
        special_parking_spaces:
          this.stepOneForm.controls['special_parking_spaces'].value,
      };
    } catch (e) {
      throw e;
    }
  }
}
