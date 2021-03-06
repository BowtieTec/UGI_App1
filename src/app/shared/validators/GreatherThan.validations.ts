import {UntypedFormGroup, ValidationErrors} from '@angular/forms'

export function DateGreaterValidations(): any {
  return (form: UntypedFormGroup) => {
    const from: Date = form.controls['from']?.value
    const to: Date = form.controls['to']?.value
    const result = from < to
    return result ? null : {datesInvalid: true}
  }
}

export function NumberGreaterValidations(): ValidationErrors | any {
  return (form: UntypedFormGroup) => {
    const hourLowerLimit: Date = form.controls['hourLowerLimit']?.value
    const hourUpperLimit: Date = form.controls['hourUpperLimit']?.value
    const minuteLowerLimit: Date = form.controls['minuteLowerLimit']?.value
    const minuteUpperLimit: Date = form.controls['minuteUpperLimit']?.value
    const result = hourLowerLimit <= hourUpperLimit && hourLowerLimit < hourUpperLimit ? true : minuteLowerLimit < minuteUpperLimit
    return result ? null : {quantitiesInvalid: true}
  }
}

export function NumberParkingGreaterValidations(): ValidationErrors | null {
  return (form: UntypedFormGroup) => {
    const special_parking_spaces: number = form.get(
      'special_parking_spaces'
    )?.value
    const parking_spaces: number = form.get('parking_spaces')?.value
    const result = special_parking_spaces < parking_spaces
    return result ? null : {parkingSpacesInvalid: true}
  }
}
