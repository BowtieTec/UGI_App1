import {Injectable} from '@angular/core'
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable, throwError} from 'rxjs'
import {AuthService} from '../../shared/services/auth.service'
import {catchError} from 'rxjs/operators'
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private routes: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = this.authService.getUser().token
    const request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Referrer-Policy': 'no-referrer-when-downgrade',
        'X-Permitted-Cross-Domain-Policies': 'none',
        'strict-transport-security': 'max-age=31536000; includeSubDomains',
        'Content-Security-Policy': 'default-src \'self\'',
        'Permissions-Policy': '\'none\'',
        'X-content-type-options': 'nosniff',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'X-Frame-Options': 'SAMEORIGIN'
      }
    })

    return next
      .handle(request)
      .pipe(catchError((err: HttpErrorResponse) => throwError(err)))
  }
}
