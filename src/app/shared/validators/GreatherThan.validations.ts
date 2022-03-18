import { FormGroup, ValidationErrors } from '@angular/forms'

export function DateGreaterValidations(): any {
  return (form: FormGroup) => {
    const from: Date = form.controls['from']?.value
    const to: Date = form.controls['to']?.value
    const result = from < to
    return result ? null : { datesInvalid: true }
  }
}

export function NumberGreaterValidations(): ValidationErrors | any {
  return (form: FormGroup) => {
    const hourLowerLimit: Date = form.controls['hourLowerLimit']?.value
    const hourUpperLimit: Date = form.controls['hourUpperLimit']?.value
    const minuteLowerLimit: Date = form.controls['minuteLowerLimit']?.value
    const minuteUpperLimit: Date = form.controls['minuteUpperLimit']?.value
    console.log(
      hourLowerLimit,
      hourUpperLimit,
      minuteLowerLimit,
      minuteUpperLimit
    )
    const result = hourLowerLimit < hourUpperLimit
    return result ? null : { quantitiesInvalid: true }
  }
}

export function NumberParkingGreaterValidations(): ValidationErrors | null {
  return (form: FormGroup) => {
    const special_parking_spaces: number = form.get(
      'special_parking_spaces'
    )?.value
    const parking_spaces: number = form.get('parking_spaces')?.value
    const result = special_parking_spaces < parking_spaces
    return result ? null : { parkingSpacesInvalid: true }
  }
}
