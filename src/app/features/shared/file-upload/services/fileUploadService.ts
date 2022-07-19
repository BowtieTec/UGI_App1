import {HttpClient} from '@angular/common/http'
import {Injectable, OnInit} from '@angular/core'
import {UntypedFormBuilder} from '@angular/forms'
import {Router} from '@angular/router'
import {Observable} from 'rxjs'
import {MessageService} from 'src/app/shared/services/message.service'
import {environment} from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class FileUploadService implements OnInit {
  private apiUrl = environment.serverAPI

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private route: Router,
    private formBuilder: UntypedFormBuilder
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

  UploadBackground(data: FormData, parkingId: string) {
    return this.http.put(
      `${this.apiUrl}backoffice/parking/upload-image/background/${parkingId}`,
      data
    )
  }
}
