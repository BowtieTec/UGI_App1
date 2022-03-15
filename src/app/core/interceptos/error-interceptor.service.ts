import { ErrorHandler, Injectable } from '@angular/core'
import { MessageService } from '../../shared/services/message.service'
import { Router } from '@angular/router'
import { AuthService } from '../../shared/services/auth.service'
import { throwError } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private message: MessageService,
    private router: Router,
    private auth: AuthService
  ) {}

  handleError(error: Response | any) {
    console.log(error)
    switch (error.status) {
      case 401:
        this.message.error('Token vencido. Por favor iniciar sesion nuevamente')
        this.auth.cleanUser()
        this.router.navigate(['/'])
        return
    }
    let errMsg: string
    if (error instanceof Response) {
      const body: any = error.json() || ''
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`
      return throwError(errMsg)
    } else {
      errMsg = error.message ? error.message : error.toString()
    }
    if (!environment.production) console.error('Error: ', errMsg)

    return throwError(errMsg)
  }

  protected extractData(res: Response) {
    const body: any = res.json()
    return body.data || {}
  }
}
