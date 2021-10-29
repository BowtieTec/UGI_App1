import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  constructor() {}

  markAsTouched(form: FormGroup) {
    Object.values(form.controls).forEach((control: AbstractControl) =>
      control.markAsTouched()
    );
  }

  controlInvalid(form: FormGroup, control: string): boolean {
    let resp: boolean | undefined =
      form.get(control)?.invalid && form.get(control)?.touched;
    return resp == undefined ? false : resp;
  }

  validateNIT(control: FormControl): { [s: string]: boolean } | null {
    if (control.value == null) {
      return null;
    }
    let nitArray: number[] = Array.from(String(control.value), Number);
    let checker: number = nitArray[nitArray.length - 1];
    let total: number = 0;
    for (let i = 0; i < nitArray.length - 1; i++) {
      total = total + nitArray[i] * (i + 2);
    }
    if (!(Math.round(Math.round(total % 11) % 11) == checker)) {
      return {
        nitRight: true,
      };
    }
    return null;
  }
}
