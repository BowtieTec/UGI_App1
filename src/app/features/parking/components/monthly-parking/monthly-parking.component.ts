import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../../shared/services/message.service";
import {ParkingService} from "../../services/parking.service";
import {UtilitiesService} from "../../../../shared/services/utilities.service";

@Component({
  selector: 'app-monthly-parking',
  templateUrl: './monthly-parking.component.html',
  styleUrls: ['./monthly-parking.component.css']
})
export class MonthlyParkingComponent  {
  monthlyForm: FormGroup = this.createForm();
  constructor(private formBuilder: FormBuilder,
              private message: MessageService,
              private parkingService: ParkingService,
              private utilitiesService: UtilitiesService) {
  }

  get byDate(){
    return this.monthlyForm.controls['byDate']?.value;
  }

createForm(){
    return this.formBuilder.group( {
      idParking: [null, [Validators.required]],
      monthlyAmount: [null, [Validators.required]],
      monday: [false],
      tuesday: [false],
      wednesday: [false],
      thursday: [false],
      friday: [false],
      saturday: [false],
      sunday: [false],
      telephone: [null,[ Validators.required]],
      identify: [null, [Validators.required]],
      unlimited: [false],
      byDate: [false],
      dateInit: [null],
      dateOut: [null]
    })
}

  createMonthly() {
    console.log(this.monthlyForm);
  }
}
