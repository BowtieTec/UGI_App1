import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../../environments/environment'
import { ResponseModel } from '../../../shared/model/Request.model'
import {
  ChangePasswordModel,
  ConfirmCodeModel
} from '../models/RecoveryPassword.model'

@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {
  private apiUrl = environment.serverAPI

  constructor(private http: HttpClient) {}

  sendConfirmCode(email: string) {
    return this.http.post<ResponseModel>(
      `${this.apiUrl}backoffice/recovery-password/email`,
      {
        email
      }
    )
  }

  confirmCode(confirmModel: ConfirmCodeModel) {
    return this.http.post<ResponseModel>(
      `${this.apiUrl}backoffice/recovery-password/confirmCode`,
      confirmModel
    )
  }

  recoveryPassword(recoveryModel: ChangePasswordModel) {
    return this.http.post<ResponseModel>(
      `${this.apiUrl}backoffice/recovery-password/changePassword`,
      recoveryModel
    )
  }
}
