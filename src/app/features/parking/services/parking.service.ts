import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
import {
  CurrencyOptionModel,
  Day,
  PaymentMethodModel,
  SettingsOptionsModel,
} from '../models/SettingsOption.model';
import { Observable, Subscribable } from 'rxjs';
import { CountriesModel } from '../models/Countries.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  private apiUrl = environment.serverAPI;
  parkingStepOne: CreateParkingStepOneModel = new CreateParkingStepOneModel();
  parkingStepTwo: CreateParkingStepTwoModel = new CreateParkingStepTwoModel();
  parkingStepFour: CreateParkingStepFourModel =
    new CreateParkingStepFourModel();
  parkingStepFive: CreateParkingStepFiveModel[] =
    new Array<CreateParkingStepFiveModel>();
  settingsOptions!: SettingsOptionsModel;
  countries: CountriesModel[] = new Array<CountriesModel>();

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private route: Router,
    private formBuilder: FormBuilder
  ) {
    this.getCountries()
      .toPromise()
      .then((data) => {
        this.countries = data.data;
      })
      .then(() => {
        this.getSettingsOptions()
          .toPromise()
          .then((data) => {
            this.settingsOptions = data;
          })
          .catch((err) => {
            this.message.error(
              '',
              'No se pudo obtener la información inicial. Si el problema perciste comunicarse con el administrador'
            );
          });
      });
  }

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
          return data;
        })
      );
  }

  setStepTwo(): Observable<ResponseModel> {
    console.log('Paso 2');
    return this.http
      .post<ResponseModel>(
        `${this.apiUrl}backoffice/parking/schedule`,
        this.parkingStepTwo
      )
      .pipe(
        map((data) => {
          if (!data.success) throw data.message;
          return data;
        })
      );
  }

  setStepFour(): Observable<ResponseModel> {
    console.log('Paso 4');
    return this.http
      .post<ResponseModel>(
        `${this.apiUrl}backoffice/parking/payment-invoice`,
        this.parkingStepFour
      )
      .pipe(
        map((data) => {
          if (!data.success) throw data.message;
          return data;
        })
      );
  }

  setStepFive(antenna: CreateParkingStepFiveModel): Promise<ResponseModel> {
    return this.http
      .post<ResponseModel>(`${this.apiUrl}backoffice/parking/station`, antenna)
      .toPromise();
  }

  getCountryById(id: number): CountriesModel {
    let country = this.countries.find((x) => x.id == id);
    if (country === undefined) {
      this.message.errorTimeOut(
        '',
        'No se encontró el país seleccionado. Verifique la información. Si el problema persiste comunicarse con el administrador.'
      );
      country = new CountriesModel();
    }
    return country;
  }

  getPayMethodById(id: number) {
    let result = this.settingsOptions.paymentMethods.find((x) => x.id == id);
    return result === undefined ? (result = new PaymentMethodModel()) : result;
  }

  getCurrencyById(id: number) {
    let result = this.settingsOptions.currencyOptions.find((x) => x.id == id);
    return result === undefined ? (result = new CurrencyOptionModel()) : result;
  }

  getDayById(id: number) {
    let result = this.settingsOptions.days.find((x) => x.id == id);
    if (result === undefined) {
      result = new Day();
    }
    return result;
  }

  getTypeAntennaById(id: number): AccessModel {
    let result = this.getAccesses().find((x: AccessModel) => x.value == id);
    return result === undefined ? (result = new AccessModel()) : result;
  }

  getAntennas(idParking: string) {
    const header = new HttpHeaders().append('', '');
    const params = new HttpParams().append('parking', idParking);
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/parking/${idParking}/station/`
    );
  }

  saveParkingSteps() {
    console.log(this.parkingStepOne);
    console.log(this.parkingStepTwo);
  }

  /*     this.message.showLoading();
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
