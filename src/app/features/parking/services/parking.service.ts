import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../shared/services/message.service';
import { ResponseModel } from '../../../shared/model/Request.model';
import {
  AccessModel,
  CreateParkingStepFourModel,
  CreateParkingStepOneModel,
  CreateParkingStepTwoModel,
} from '../models/CreateParking.model';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { SettingsOptionsModel } from '../models/SettingsOption.model';

import { Observable } from 'rxjs';

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
    return this.http.get<ResponseModel>(`${this.apiUrl}utilities/countries`);
  }

  getSettingsOptions(): Observable<SettingsOptionsModel> {
    return this.http
      .get<ResponseModel>(`${this.apiUrl}backoffice/parking/settings-options`)
      .pipe(
        map((data) => {
          if (!data.success) throw data.message;
          return { ...data.data };
        })
      );
  }

  getAccesses(): Array<AccessModel> {
    return [
      { value: 0, accessType: 'Entrada' },
      { value: 1, accessType: 'Salida' },
    ];
  }

  setStepOne(stepOne: CreateParkingStepOneModel): Promise<any> {
    console.log('Paso 1');
    return this.http
      .post<ResponseModel>(`${this.apiUrl}backoffice/parking/create`, stepOne)
      .pipe(
        map((data) => {
          if (!data.success) throw data.message;
          console.log(data);
          return data;
        })
      )
      .toPromise();
  }

  setStepTwo(stepTwo: CreateParkingStepTwoModel): Promise<any> {
    console.log('Paso 2');
    return this.http
      .post<ResponseModel>(`${this.apiUrl}backoffice/parking/schedule`, stepTwo)
      .pipe(
        map((data) => {
          if (!data.success) throw data.message;
          console.log(data);
          return data;
        })
      )
      .toPromise();
  }

  setStepFour(stepFour: CreateParkingStepFourModel): Promise<any> {
    console.log('Paso 4');
    return this.http
      .post<ResponseModel>(
        `${this.apiUrl}backoffice/parking/payment-invoice`,
        stepFour
      )
      .pipe(
        map((data) => {
          if (!data.success) throw data.message;
          console.log(data);
          return data;
        })
      )
      .toPromise();
  }

  saveParkingSteps(
    parkingStepOne: CreateParkingStepOneModel,
    parkingStepTwo: CreateParkingStepTwoModel,
    parkingStepFour: CreateParkingStepFourModel
  ) {
    this.message.showLoading();
    this.setStepOne(parkingStepOne)
      .then((data) => {
        parkingStepTwo.parkingId = data.data.id;
        console.log(parkingStepTwo.parkingId);
        return this.setStepTwo(parkingStepTwo);
      })
      .then((data) => {
        parkingStepFour.parkingId = data.data.id;
        return this.setStepFour(parkingStepFour);
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .then((data) => {
        console.log(data);
        this.message.hideLoading();
        this.message.OkTimeOut('Parqueo guardado');
      });
  }
}
