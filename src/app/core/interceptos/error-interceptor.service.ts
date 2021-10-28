import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private message: MessageService, private router: Router) {}

  handleError(error: any) {
    // console.log(error);
    // if (!(error instanceof HttpErrorResponse)) {
    //   error = error.rejection; // get the error object
    //   this.message.error(
    //     '',
    //     typeof error == 'string' ? error : error.error.message
    //   );
    // } else {
    //   this.message.error('Error', 'Er');
    // }
    console.log(error.rejection);
    if (error.status === 400) {
      this.message.error(
        'Sesión vencida',
        'Datos faltantes o incorrectos. Porfavor verifique que no falten datos. Si el problema persiste comunicarse con administracion.'
      );
    } else if (error.status === 401) {
      this.message.error(
        'Sesión vencida',
        'El tiempo de sesión ha vencido. Por favor vuelva a iniciar sesión.'
      );
      this.router.navigateByUrl('/');
    } else if (error.status === 404) {
      this.message.error(
        'Servicio no encontrado.',
        'Por favor verifique que tenga conexión a internet o intente mas tarde.' +
          'Si el problema persiste por favor comuníquese con el administrador.'
      );
    } else if (error.status === 409) {
      this.message.error('Error', `${error.error.message}`);
    } else if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection; // get the error object
      if (error.status == 400) {
        this.message.error(
          'Error',
          'Datos faltantes o incorrectos. Por favor verificar que los datos estén correctamente llenados.'
        );
      } else {
        this.message.error(
          'Error desconocido',
          typeof error == 'string' ? error : error.error.message
        );
      }
    } else if (error.message.split(':').length == 1) {
      this.message.errorTimeOut('Error', error.message);
    } else if (error.message.split(':').length > 1) {
      let message = error.message.split(':');
      this.message.error(
        'Error',
        `${message.length > 1 ? message[1] : message[0]}`
      );
      //TODO: error.message enviar al Log.
    }
  }
}
