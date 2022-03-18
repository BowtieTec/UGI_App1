import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { MessageService } from 'src/app/shared/services/message.service'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RegisterPublicFormService {
  private apiUrl = environment.serverAPI

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {}

  UploadLogo(data: any, parkingId: string): Observable<any> {
    console.log(data)
    return this.http.post(
      `${this.apiUrl}backoffice/parking/upload-image/logo/${parkingId}`,
      data
    )
  }

  UploadTariff(data: any, parkingId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}backoffice/parking/upload-image/tariff/${parkingId}`,
      data
    )
  }

  UploadPlans(data: any, parkingId: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}backoffice/parking/upload-image/plans/${parkingId}`,
      data
    )
  }
}
