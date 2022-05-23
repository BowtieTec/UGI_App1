import {HttpClient} from '@angular/common/http'
import {Injectable, OnInit} from '@angular/core'
import {FormBuilder} from '@angular/forms'
import {Router} from '@angular/router'
import {Observable} from 'rxjs'
import {MessageService} from 'src/app/shared/services/message.service'
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class RegisterPublicFormService implements OnInit {
  private apiUrl = environment.serverAPI

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
  }

  UploadLogo(data: any, parkingId: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}backoffice/parking/upload-image/emblem/${parkingId}`,
      data
    )
  }

  UploadTariff(data: any, parkingId: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}backoffice/parking/upload-image/rate/${parkingId}`,
      data
    )
  }

  UploadPlans(data: any, parkingId: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}backoffice/parking/upload-image/map/${parkingId}`,
      data
    )
  }

  ngOnInit(): void {
  }
}
