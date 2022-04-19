import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthService } from '../../shared/services/auth.service'
import { PermissionsService } from '../../shared/services/permissions.service'
import { MessageService } from '../../shared/services/message.service'
import { EncryptionService } from '../../shared/services/encryption.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private permissions: PermissionsService,
    private messageService: MessageService,
    private crypto: EncryptionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.messageService.showLoading()
    if (sessionStorage.getItem(this.crypto.encryptKey('User', this.auth.userContext)) == undefined) {
      this.messageService.infoTimeOut(
        'Debe iniciar sesión para acceder a las funcionalidades.',
        'Iniciar sesión'
      )
      this.router.navigate(['/'])
      return false
    }

    return this.permissions
      .getMenuOptionsValidated()
      .then((options): boolean => {
        this.messageService.hideLoading()
        if (options.find((option) => option.module == route.url.toString())) {
          return true
        } else {
          return false
        }
      })
  }
}
