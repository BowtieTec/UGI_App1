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
      console.log(tempToken)
      request = req.clone({
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
