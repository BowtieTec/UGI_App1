import {ErrorHandler, Injectable} from '@angular/core'
import {MessageService} from '../../shared/services/message.service'
import {Router} from '@angular/router'
import {AuthService} from '../../shared/services/auth.service'
import {throwError} from 'rxjs'
import {environment} from '../../../environments/environment'
import {HttpErrorResponse} from '@angular/common/http'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private message: MessageService,
    private router: Router,
    private auth: AuthService
  ) {
  }

  handleError(error: Response | HttpErrorResponse | any) {
    if (!environment.production) console.error('Error: ', error)

    if (error.error?.message) {
      const err = error.error.message.toString()
      if (err.includes('Duplicate entry')) {
        const message = err.slice(err.indexOf('Duplicate entry \'') + 17, err.indexOf('\' for key '))
        this.message.error(` "${message}" ya existe`)
        return
      } else if (err.includes('Error: Error:')) {
        const message = err.slice(err.indexOf('Error: Error:') + 14, err.lastIndexOf('Error: Error:'))
        this.message.error(message)
        return
      } else if (err.includes('"success":false,"message":"')) {
        const message = err.slice(err.indexOf('"success":false,"message":"') + 27, err.lastIndexOf('"}}:') - 2)
        this.message.error(message)
        return
      }
    }

    switch (error.status) {
      case 401:
        this.message.error('Token vencido. Por favor iniciar sesión nuevamente')
        this.auth.cleanUser()
        this.router.navigate(['/'])
        return
    }
    let errMsg: string
    if (error instanceof Response) {
      const body: any = error.json() || ''
      const err = body.error || JSON.stringify(body)
      errMsg = `${error.status} - ${error.statusText || ''} ${err.message}`
      return throwError(errMsg)
    } else if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 500:
          this.message.error('Error')
          return
      }
    }
    const errorString = error.toString()
    if (errorString.includes('Duplicate entry')) {
      const message = errorString.slice(errorString.indexOf('Duplicate entry \'') + 17, errorString.indexOf('\' for key '))
      this.message.error(` "${message}" ya existe`)
      return
    } else if (errorString.includes('Error: Error:')) {
      const message = errorString.slice(errorString.indexOf('Error: Error:') + 14, errorString.lastIndexOf('Error: Error:'))
      this.message.error(message)
      return
    } else if (errorString.includes('"success":false,"message":"')) {
      const message = errorString.slice(errorString.indexOf('"success":false,"message":"') + 27, errorString.lastIndexOf('"}}:') - 2)
      this.message.error(message)
      return
    } else if (errorString.includes('ObjectUnsubscribedError: object unsubscribed')) {
      return
    }

    this.message.error('Error no manejado. Por favor contacte al administrador')
    throw Error(error)
  }

  protected extractData(res: Response) {
    const body: any = res.json()
    return body.data || {}
  }
}
