import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ResponseModel } from 'src/app/shared/model/Request.model'
import { MessageService } from 'src/app/shared/services/message.service'
import { environment } from 'src/environments/environment'
import { map } from 'rxjs/operators'
import { tariffTestModel } from '../models/tariff-test.model'

@Injectable({
  providedIn: 'root'
})
export class TariffTestService {
  apiUrl = environment.serverAPI

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  getTariffTest(testModel: tariffTestModel) {
    this.messageService.showLoading()
    return this.http
      .post<ResponseModel>(`${this.apiUrl}backoffice/tariff/test`, testModel)
      .pipe(
        map((x: ResponseModel) => {
          console.log(x)
          if (x.success) {
            this.messageService.hideLoading()
            return x.data
          } else {
            console.log('error', x.message)
            this.messageService.error('', x.message)
            return []
          }
        })
      )
      .toPromise()
  }
}
