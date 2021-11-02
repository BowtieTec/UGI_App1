import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ParkingService } from '../../../services/parking.service';
import { CountriesModel } from '../../../models/Countries.model';
import { MessageService } from '../../../../../shared/services/message.service';
import {
  Day,
  SettingsOptionsModel,
} from '../../../models/SettingsOption.model';
import { AccessModel } from '../../../models/CreateParking.model';

@Component({
  selector: 'app-step-six',
  templateUrl: './step-six.component.html',
  styleUrls: ['./step-six.component.css'],
})
export class StepSixComponent implements OnInit {
  @Output() changeStep = new EventEmitter<number>();
  countries: CountriesModel[] = new Array<CountriesModel>();

  constructor(
    private parkingService: ParkingService,
    private message: MessageService
  ) {
    this.getInitialData();
  }

  get stepOne() {
    return this.parkingService.parkingStepOne;
  }

  get stepTwo() {
    return this.parkingService.parkingStepTwo;
  }

  // }
  get stepFour() {
    return this.parkingService.parkingStepFour;
  }

  // get stepThree(){
  //   return this.parkingService.three;

  get stepFive() {
    return this.parkingService.parkingStepFive;
  }

  ngOnInit(): void {}

  getInitialData() {
    return this.parkingService
      .getCountries()
      .toPromise()
      .then((data) => {
        this.countries = data.data;
      });
  }

  getCountryById(id: number) {
    return this.parkingService.getCountryById(id);
  }

  getPayMethodById(id: number) {
    return this.parkingService.getPayMethodById(id);
  }

  getCurrencyById(id: number) {
    return this.parkingService.getCurrencyById(id);
  }

  getDayById(id: number): Day {
    return this.parkingService.getDayById(id);
  }

  getTypeAntennaById(id: number): AccessModel {
    return this.parkingService.getTypeAntennaById(id);
  }
}
