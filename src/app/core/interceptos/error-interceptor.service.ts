import { ErrorHandler, Injectable } from '@angular/core'
import { MessageService } from '../../shared/services/message.service'
import { Router } from '@angular/router'
import { AuthService } from '../../shared/services/auth.service'
import { throwError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http'
import { ResponseModel } from '../../shared/model/Request.model'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private message: MessageService,
    private router: Router,
    private auth: AuthService
  ) {}

  handleError(error: Response | HttpErrorResponse | any) {
    if (!environment.production) console.error('Error: ')
    switch (error.status) {
      case 401:
        this.message.error('Token vencido. Por favor iniciar sesión nuevamente')
        this.auth.cleanUser()
        this.router.navigate(['/'])
        return
      case 408:
        this.message.error(
          'Error interno del sistema. Cierre sesión y vuelva a intentar.'
        )
        return
    }
    let errMsg: string
    if (error instanceof Response) {
      const body: any = error.json() || ''
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`

      return throwError(errMsg)
    } else if(error instanceof  HttpErrorResponse) {
        switch (error.status) {
          case 409:
            this.message.error(
              'Error interno del sistema. Cierre sesión y vuelva a intentar.'
            )
            return
          case 500:
            this.message.error('Error');
            return
        }
    }

    return throwError(error)
  }

  protected extractData(res: Response) {
    const body: any = res.json()
    return body.data || {}
  }
}
