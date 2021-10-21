import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessageService } from '../../../shared/services/message.service';
import { RequestModel } from '../../../shared/model/Request.model';
import { CreateParkingStepOneModel } from '../models/CreateParking.model';
import { UserResponseModel } from '../../../shared/model/UserResponse.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private apiUrl = environment.serverAPI;

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private route: Router
  ) {}

  getCountries() {
    return this.http.get<RequestModel>(`${this.apiUrl}utilities/countries`);
  }

  setStepOne(stepOne: CreateParkingStepOneModel) {
    return this.http
      .post<UserResponseModel>(
        `${this.apiUrl}backoffice/parking/create`,
        stepOne
      )
      .subscribe((data) => {
        this.message.OkTimeOut('!Listo!');
        this.route.navigate(['/home/dashboard']);
      });
  }
}
