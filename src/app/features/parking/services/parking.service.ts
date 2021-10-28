import { ErrorHandler, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../shared/services/message.service';
import { ResponseModel } from '../../../shared/model/Request.model';
import {
  AccessModel,
  CreateParkingStepFiveModel,
  CreateParkingStepFourModel,
  CreateParkingStepOneModel,
  CreateParkingStepTwoModel,
} from '../models/CreateParking.model';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { SettingsOptionsModel } from '../models/SettingsOption.model';
import { Observable, Subscribable } from 'rxjs';
import { CountriesModel } from '../models/Countries.model';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private apiUrl = environment.serverAPI;
  parkingStepOne: CreateParkingStepOneModel = new CreateParkingStepOneModel();
  parkingStepTwo: CreateParkingStepTwoModel = new CreateParkingStepTwoModel();
  countries: CountriesModel[] = [];
  accessList: AccessModel[] = [];
  parkingStepFour: CreateParkingStepFourModel =
    new CreateParkingStepFourModel();
  parkingStepFive: CreateParkingStepFiveModel[] =
    new Array<CreateParkingStepFiveModel>();
  settingsOptions!: SettingsOptionsModel;

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

  setStepOne(): Subscribable<ResponseModel> {
    console.log('Paso 1');
    return this.http
      .post<ResponseModel>(
        `${this.apiUrl}backoffice/parking/create`,
        this.parkingStepOne
      )
      .pipe(
        map((data) => {
          console.log(data);
          return data;
        })
      );
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

  setStepFive(stepFive: CreateParkingStepFiveModel): Promise<any> {
    return this.http
      .post<ResponseModel>(`${this.apiUrl}backoffice/parking/station`, stepFive)
      .pipe(
        map((data) => {
          return data.success;
        })
      )
      .toPromise();
  }

  /* saveParkingSteps() {
     this.message.showLoading();
     this.setStepOne(this.parkingStepOne)
       .then((data) => {
         this.parkingStepTwo.parkingId = data.data.id;

         return this.setStepTwo(this.parkingStepTwo);
       })
       .then((data) => {
         this.parkingStepFour.parkingId = data.data.id;
         return this.setStepFour(this.parkingStepFour);
       })
       .then((data) => {
         console.log('Paso 5');
         let promises = Array<Promise<any>>();
         this.parkingStepFive.forEach((antenna: CreateParkingStepFiveModel) => {
           antenna.parking = data.data.id;
           console.log(antenna);
           promises.push(this.setStepFive(antenna));
         });
         Promise.all(promises).then((data) => {
           console.log(data);
           data.forEach((response, i) => {
             //TODO: Filtrar los resultados que sean falsos y mostrarlos en un mensaje.
           });
           return data;
         });
       })
       .then((data) => {
         this.message.hideLoading();
         this.message.OkTimeOut('Parqueo guardado');
       })
       .catch((error) => {
         throw error;
       });
   }*/
}
