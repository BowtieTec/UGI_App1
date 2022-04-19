import { Component } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../shared/services/auth.service'
import { MessageService } from '../../../shared/services/message.service'
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private message: MessageService
  ) {
    this.createForm()
  }

  controlInvalid(control: string) {
    return (
      this.loginForm.get(control)?.invalid &&
      this.loginForm.get(control)?.touched
    )
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      //TODO: Quitar los valores por defecto. Estos solo fueron puestos para hacer mas facil el logueo dentro del sistema mientras se desarrolla.
      //TODO: Descomentar las validacioens cuando se suba a produccion. Esto se comentó porque el email y contraseña admin son de prueba y no cumplen con los requerimientos
      email: [
        '',
           [Validators.required,
             Validators.pattern(
               "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$"
             ),
           ]
      ],
      password: ['', [Validators.required, Validators.pattern(environment.settings.passwordPattern)]]
    })
  }

  login() {
    if (this.loginForm.invalid) {
      this.message.errorTimeOut('', 'Correo o contraseña incorrectos')
      Object.values(this.loginForm.controls).forEach((control) =>
        control.markAsTouched()
      )
    } else {
      this.auth.login({
        password: this.loginForm.value.password,
        email: this.loginForm.value.email
      })
    }
  }
}
