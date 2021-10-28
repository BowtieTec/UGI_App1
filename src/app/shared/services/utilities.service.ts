import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

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
    let resp: boolean | undefined = false;
    resp = form.get(control)?.invalid && form.get(control)?.touched;
    return resp == undefined ? false : resp;
  }
}
