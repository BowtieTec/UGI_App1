import {Injectable} from '@angular/core'
import {FormBuilder, Validators} from '@angular/forms'
import {DateGreaterValidations, NumberGreaterValidations} from '../../../../shared/validators/GreatherThan.validations'

@Injectable({
  providedIn: 'root'
})
export class TariffFormsService {
  constructor(private formBuilder: FormBuilder) {
  }

  createGeneralDataForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isShowDescription: [true],
      hasGlobalSchedule: [false],
      isPerDayCondition: [false],
      parkingId: []
    })
  }

  createHourHalfForm() {
    return this.formBuilder.group({
      hourCost: [null, Validators.required],
      halfCost: [null, Validators.required],
      whenIsAHalf: ['1', Validators.required],
      subtract: ['0', [Validators.required]],
      subtractMinutes: ['0', [Validators.required]]
    })
  }

  createFixedCostForm() {
    return this.formBuilder.group({
      fixedCost: [null, Validators.required],
      whenIsAHalf: ['1', Validators.required],
      subtract: ['0', [Validators.required]],
      subtractMinutes: ['0', [Validators.required]]
    })
  }

  createPrioriceForm() {
    return this.formBuilder.group({
      prioriceCost: ['1', Validators.required]
    })
  }

  createPrincipalScheduleForm() {
    return this.formBuilder.group(
      {
        from: ['', [Validators.required]],
        to: ['', [Validators.required]]
      },
      {validators: [DateGreaterValidations()]}
    )
  }

  createHolidayOrRankForm() {
    return this.formBuilder.group(
      {
        from: ['', Validators.required],
        to: ['', [Validators.required]]
      },
      {validators: [DateGreaterValidations()]}
    )
  }

  createBlockForm() {
    return this.formBuilder.group(
      {
        hourLowerLimit: [null, [Validators.required, Validators.min(0)]],
        hourUpperLimit: [null, [Validators.required, Validators.min(0)]],
        minuteLowerLimit: [null, [Validators.required, Validators.min(0)]],
        minuteUpperLimit: [null, [Validators.required, Validators.min(0)]]
      },
      {validators: [NumberGreaterValidations()]}
    )
  }

  createDefaultForm() {
    return this.formBuilder.group({})
  }

  createDailyForm() {
    return this.formBuilder.group({
      costPerDay: [null, [Validators.required]]
    })
  }

  createDaysSelectedForm() {
    return this.formBuilder.group({
      mon: [true],
      tue: [true],
      wed: [true],
      thu: [true],
      fri: [true],
      sat: [false],
      sun: [false]
    })
  }
}
