import {FormGroup, } from "@angular/forms";

export function DateGreaterValidations(): any {
  return (form:FormGroup) => {
    let from: Date = form.controls['from']?.value;
    let to: Date = form.controls['to']?.value;
    let result = from < to;
    return result? null: {datesInvalid: true};
  }
}
export function NumberGreaterValidations(): any {
  return (form:FormGroup) => {
    let lowerLimit: Date = form.controls['lowerLimit']?.value;
    let upperLimit: Date = form.controls['upperLimit']?.value;
    let result = lowerLimit < upperLimit;
    return result? null: {quantitiesInvalid: true};
  }
}
export function NumberParkingGreaterValidations(): any {
  return (form:FormGroup) => {
    let special_parking_spaces: Date = form.controls['special_parking_spaces']?.value;
    let parking_spaces: Date = form.controls['parking_spaces']?.value;
    let result = special_parking_spaces < parking_spaces;
    return result? null: {parkingSpacesInvalid: true};
  }
}
