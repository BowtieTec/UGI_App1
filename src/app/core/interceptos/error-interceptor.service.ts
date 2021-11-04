import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private message: MessageService, private router: Router) {}

  handleError(error: any) {
    if (error.status === 400) {
      this.message.error(
        'Datos incorrectos',
        'Datos faltantes o incorrectos. Por favor verifique que no falten datos. Si el problema persiste comunicarse con administración.'
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
    } else {
      console.log(error);
      this.message.error('Error', 'Error desconocido');
    }
  }
}
