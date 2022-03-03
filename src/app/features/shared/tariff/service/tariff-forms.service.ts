import { Injectable } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import {
  DateGreaterValidations,
  NumberGreaterValidations
} from '../../../../shared/validators/GreatherThan.validations'

@Injectable({
  providedIn: 'root'
})
export class TariffFormsService {
  constructor(private formBuilder: FormBuilder) {}

  createGeneralDataForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isShowDescription: [true],
      hasGlobalSchedule: [false]
    })
  }

  createHourHalfForm() {
    return this.formBuilder.group({
      hourCost: [null, Validators.required],
      halfCost: [null, Validators.required]
    })
  }

  createFixedCostForm() {
    return this.formBuilder.group({
      fixedCost: [null, Validators.required]
    })
  }

  createPrioriceForm() {
    return this.formBuilder.group({
      prioriceCost: ['1', Validators.required]
    })
  }

  createPrincipalScheduleForm() {
    return this.formBuilder.group({
      from: ['', []],
      to: ['', []]
    })
  }

  createHolidayOrRankForm() {
    return this.formBuilder.group(
      {
        from: ['', Validators.required],
        to: ['', [Validators.required]]
      },
      { validators: [DateGreaterValidations()] }
    )
  }

  createBlockForm() {
    return this.formBuilder.group(
      {
        lowerLimit: [null, [Validators.required, Validators.min(0)]],
        upperLimit: [null, [Validators.required, Validators.min(0)]],
        minuteLowerLimit: [null, [Validators.required, Validators.min(0)]],
        minuteUpperLimit: [null, [Validators.required, Validators.min(0)]]
      },
      { validators: [NumberGreaterValidations()] }
    )
  }

  createDefaultForm() {
    return this.formBuilder.group({})
  }

  createDaysSelectedForm() {
    return this.formBuilder.group({
      mon: [false],
      tue: [false],
      wed: [false],
      thu: [false],
      fri: [false],
      sat: [false],
      sun: [false]
    })
  }
}
