import { ErrorHandler, Injectable } from '@angular/core';
import { MessageService } from '../../shared/services/message.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private message: MessageService, private router: Router) {}

  handleError(error: any) {
    if (error.status === 401) {
      this.message.error(
        'Sesión vencida',
        'El tiempo de sesión ha vencido. Por favor vuelva a iniciar sesión.'
      );
      this.router.navigateByUrl('/');
    }
  }
}
