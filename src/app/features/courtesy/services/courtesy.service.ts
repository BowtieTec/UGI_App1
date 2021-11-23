import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ResponseModel } from '../../../shared/model/Request.model';
import { CourtesyModel } from '../models/Courtesy.model';

@Injectable({
  providedIn: 'root',
})
export class CourtesyService {
  private apiUrl = environment.serverAPI;

  constructor(private http: HttpClient) {}

  getTypes() {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/cortesy/typeCortesies`
    );
  }

  saveCourtesy(newCourtesy: CourtesyModel) {
    return this.http.post<ResponseModel>(
      `${this.apiUrl}backoffice/cortesy/create`,
      newCourtesy
    );
  }

  getCourtesys(id: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/cortesy/cortesiesDetails/${id}`
    );
  }

  getPDF(id: string) {
    return this.http.get(
      `${this.apiUrl}backoffice/cortesy/cortesiespdf/${id}`,
      { responseType: 'blob' }
    );
  }
}
