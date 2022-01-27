import {Injectable} from '@angular/core';
import {MessageService} from "../../../../../shared/services/message.service";
import {HttpClient} from "@angular/common/http";
import {CompaniesModel} from "../models/companies.model";
import {ResponseModel} from "../../../../../shared/model/Request.model";
import {environment} from "../../../../../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CompaniesService {
  apiUrl = environment.serverAPI;
  companies: CompaniesModel[] = [];

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getCompanies(parkingId: string): Observable<Array<CompaniesModel>> {
    this.messageService.showLoading();
    return this.http.get<ResponseModel>
    (`${this.apiUrl}backoffice/company/${parkingId}`)
      .pipe(
        map((x: ResponseModel) => {
          if (x.success) {
            this.messageService.hideLoading();
            return x.data;
          } else {
            this.messageService.error('', x.message);
            return [];
          }
        })
      );
  }
}
