import {Injectable} from '@angular/core'
import {UserRequestModel} from '../model/UserRequest.model'
import {HttpClient} from '@angular/common/http'
import {AuthModel, ParkingAuthModel, UserResponseModel} from '../model/UserResponse.model'
import {environment} from '../../../environments/environment'
import {MessageService} from './message.service'
import {EncryptionService} from './encryption.service'
import {Router} from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.serverAPI
  isSudo: boolean = this.getUser().user?.role?.isSudo

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private crypto: EncryptionService,
    private route: Router,
  ) {
  }


  saveUser(user: AuthModel) {
    sessionStorage.setItem(
      this.crypto.encryptKey('User'),
      this.crypto.encrypt(JSON.stringify(user).replace('/n', ''))
    )
  }

  getParking(): ParkingAuthModel {
    return this.getUser().user.parking
  }

  getUser(): AuthModel {
    const sentence = sessionStorage.getItem(this.crypto.encryptKey('User'))
    return {
      ...JSON.parse(this.crypto.decrypt(sentence!))
    }
  }

  cleanUser() {
    sessionStorage.clear()
    localStorage.clear()
  }

  login(login: UserRequestModel) {
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
        if (!data.error.success) {
          this.message.error(data.error.message);
          return
        }
        this.route.navigate(['/']).catch()
        throw new Error(data.message)
      })
  }
}
