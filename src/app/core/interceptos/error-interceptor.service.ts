import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private message: MessageService,
    private router: Router,
    private auth: AuthService
  ) {}

  handleError(error: any) {
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
    }
    if (error.status === 400) {
      this.message.error(
        'Datos incorrectos',
        'Datos faltantes o incorrectos: ' +
          (error.error.messages != undefined ? error.error.messages : '')
      );
      return;
    }
    if (error.status === 401) {
      this.message.error(
        'Sesión vencida',
        'El tiempo de sesión ha vencido. Por favor vuelva a iniciar sesión.'
      );
      this.auth.cleanUser();
      this.router.navigate(['/']);
    }
    if (error.status === 404) {
      this.message.error(
        'Servicio no encontrado.',
        'Por favor verifique que tenga conexión a internet o intente mas tarde.'
      );
      return;
    }
    if (error.status === 409) {
      if (error.error.message.includes('QueryFailedError')) {
        this.message.error(
          '',
          'Parece haber un error en la base de datos. Intenta seleccionando otros datos. Si necesitas seleccionar estos datos en concreto comunicáselo a tu administrador'
        );
      } else {
        this.message.error('', `${error.error.message}`);
      }
      return;
    }
    if (error.status == 500 || error.status == 501) {
      this.message.error('', `${error.error.message}`);
    }
    this.message.error('Error desconocido', error.error.message);
  }
}
