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
    const lowerLimit: Date = form.controls['lowerLimit']?.value
    const upperLimit: Date = form.controls['upperLimit']?.value
    const result = lowerLimit < upperLimit
    return result ? null : { quantitiesInvalid: true }
  }
}

export function NumberParkingGreaterValidations(): ValidationErrors | null {
  return (form: FormGroup) => {
    const special_parking_spaces: Date =
      form.controls['special_parking_spaces']?.value
    const parking_spaces: Date = form.controls['parking_spaces']?.value
    const result = special_parking_spaces < parking_spaces
    return result ? null : { parkingSpacesInvalid: true }
  }
}
