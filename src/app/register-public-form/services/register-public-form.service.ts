import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterPublicFormService {

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private route: Router,
    private formBuilder: FormBuilder
    ) { }

    private apiUrl = environment.serverAPI

    UploadLogo(data:any): Observable<any> {
      return this.http.post(`${this.apiUrl}backoffice/parking/upload-image/logo`,data)
    }

    UploadTariff(data:any): Observable<any> {
      return this.http.post(`${this.apiUrl}backoffice/parking/upload-image/tariff`,data)
    }

    UploadPlans(data:any): Observable<any> {
      return this.http.post(`${this.apiUrl}backoffice/parking/upload-image/plans`,data)
    }
}
