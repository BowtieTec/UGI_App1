import { Injectable } from '@angular/core'
import { UserRequestModel } from '../model/UserRequest.model'
import { HttpClient } from '@angular/common/http'
import { AuthModel, ParkingAuthModel, UserResponseModel } from '../model/UserResponse.model'
import { environment } from '../../../environments/environment'
import { MessageService } from './message.service'
import { EncryptionService } from './encryption.service'
import { Router } from '@angular/router'
import { ReCaptchaV3Service } from 'ng-recaptcha'
import { sha512 } from 'js-sha512'
import { UtilitiesService } from './utilities.service'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.serverAPI
  userContext = ''

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private crypto: EncryptionService,
    private route: Router,
    private recaptcha: ReCaptchaV3Service,
    private utilities: UtilitiesService
  ) {
    this.userContext = sha512(this.utilities.randomString())
  }

  get isSudo() {
    return this.getUser().user.role.isSudo
  }

  saveUser(user: AuthModel) {
    sessionStorage.setItem(
      this.crypto.encryptKey('User', this.userContext),
      this.crypto.encrypt(JSON.stringify(user).replace('/n', ''))
    )
  }

  getParking(): ParkingAuthModel {
    return this.getUser().user.parking
  }

  getUser(): AuthModel {
    const sentence = sessionStorage.getItem(this.crypto.encryptKey('User', this.userContext))
    return {
      ...JSON.parse(this.crypto.decrypt(sentence!))
    }
  }

  cleanUser() {
    sessionStorage.clear()
    localStorage.clear()
  }

  login(login: UserRequestModel) {
    /*this.recaptcha.execute('login')
      .subscribe((token: string) => {*/
    //login.userContext = token
    this.message.showLoading()
    this.http
      .post<UserResponseModel>(`${this.apiUrl}backoffice/admin/signin`, login)
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.saveUser(data.data)
          this.message.OkTimeOut('!Listo!')
          this.route.navigate(['/home']).catch()
        } else {
              this.cleanUser()
              this.message.error('', data.message)
              this.route.navigate(['/']).catch()
            }
          })
          .catch((data) => {
            this.cleanUser()
            this.message.error('', data.error.message)
            this.route.navigate(['/']).catch()
          })
    /* }, (err) => {
       throw new Error('Error: No pudo completarse el reCAPTCHA. Vuelva a iniciar sesión.')
     })*/
  }
}
