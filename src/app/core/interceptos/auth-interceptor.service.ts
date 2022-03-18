import { Injectable } from '@angular/core'
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { AuthService } from '../../shared/services/auth.service'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private routes: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.authService.getUser().token
    const tempToken =
      this.routes.routerState.snapshot.url.split('/registro?t=')[1]
    let request = req
    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    } else if (tempToken) {
      let url = req.url
      const split1P = req.url.split('backoffice/parking')[0]
      const split2P = req.url.split('backoffice/parking')[1]
      const split1T = req.url.split('backoffice/tariff')[0]
      const split2T = req.url.split('backoffice/tariff')[1]
      const toAddParking = 'backoffice/parking/guest'
      const toAddTariff = 'backoffice/tariff/guest'
      if (split2P) {
        url = `${split1P}${toAddParking}${split2P}`
      } else if (req.url.includes('backoffice/tariff')) {
        url = `${split1T}${toAddTariff}${split2T}`
      }
      request = req.clone({
        url,
        setHeaders: {
          Authorization: `Bearer ${tempToken}`
        }
      })
    }
    return next
      .handle(request)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err)))
  }
}
