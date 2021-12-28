import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
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
import { map } from 'rxjs/operators';
import {
  CurrencyOptionModel,
  Day,
  PaymentMethodModel,
  SettingsOptionsModel,
} from '../models/SettingsOption.model';
import { Observable, Subscribable } from 'rxjs';
import { CountriesModel } from '../models/Countries.model';
import { FormBuilder } from '@angular/forms';
import { CreateTariffModel } from '../models/Tariff.model';
import { CreateProfilesModel } from '../models/MontlyParking.model';

@Injectable({
  providedIn: 'root',
})
export class ParkingService {
  parkingStepOne: CreateParkingStepOneModel = new CreateParkingStepOneModel();
  parkingStepTwo: CreateParkingStepTwoModel = new CreateParkingStepTwoModel();
  parkingStepFour: CreateParkingStepFourModel =
    new CreateParkingStepFourModel();
  parkingStepFive: CreateParkingStepFiveModel[] =
    new Array<CreateParkingStepFiveModel>();
  settingsOptions!: SettingsOptionsModel;
  countries: CountriesModel[] = new Array<CountriesModel>();
  private apiUrl = environment.serverAPI;

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
              'No se pudo obtener la información inicial.'
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
      { value: 2, accessType: 'Entrada restringida' },
      { value: 3, accessType: 'Salida restringida' },
    ];
  }

  setStepOne(): Subscribable<ResponseModel> {
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
        'No se encontró el país seleccionado. Verifique la información.'
      );
      country = new CountriesModel();
    }
    return country;
  }

  getPayMethodById(id: number) {
    let result = this.settingsOptions.paymentMethods.find((x) => x.id == id);
    return result === undefined ? new PaymentMethodModel() : result;
  }

  getCurrencyById(id: number) {
    let result = this.settingsOptions.currencyOptions.find((x) => x.id == id);
    return result === undefined ? new CurrencyOptionModel() : result;
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
    return result === undefined ? new AccessModel() : result;
  }

  getAntennas(idParking: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/parking/${idParking}/station/`
    );
  }

  getQR(stationID: string): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}backoffice/parking/station/${stationID}/downloadqr`,
      { responseType: 'blob' }
    );
  }

  editStepFive(antennaToEdit: CreateParkingStepFiveModel) {
    return this.http.put<ResponseModel>(
      `${this.apiUrl}backoffice/parking/station/${antennaToEdit.id}`,
      antennaToEdit
    );
  }

  deleteAntenna(id: string) {
    return this.http.delete<ResponseModel>(
      `${this.apiUrl}backoffice/parking/station/${id}`
    );
  }

  setRule(rule: CreateTariffModel) {
    return this.http
      .post<ResponseModel>(`${this.apiUrl}backoffice/tariff`, rule)
      .toPromise();
  }

  getTariffsSaved(parkingId: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/tariff/parking/${parkingId}`
      )
      .toPromise();
  }

  deleteTariff(id: string) {
    return this.http
      .delete<ResponseModel>(`${this.apiUrl}backoffice/tariff/rule/${id}`)
      .toPromise();
  }

  getUsersByTelephone(telephone: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/user/search?number=${telephone}`
      )
      .toPromise();
  }

  createMonthlySubscription(subscription: any) {
    return this.http
      .post<ResponseModel>(
        `${this.apiUrl}backoffice/monthly-subscription/create`,
        subscription
      )
      .toPromise();
  }

  getProfilesOfMonthlySubscription(parkingId: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/monthly-subscription/profiles/${parkingId}`
      )
      .toPromise();
  }

  getMonthlySubscription(parkingId: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/monthly-subscription/all/${parkingId}`
      )
      .toPromise();
  }

  disableSubscription(idSubscription: string) {
    return this.http
      .put<ResponseModel>(
        `${this.apiUrl}backoffice/monthly-subscription/disable/${idSubscription}`,
        idSubscription
      )
      .toPromise();
  }

  cancelSubscription(idSubscription: string) {
    return this.http
      .put<ResponseModel>(
        `${this.apiUrl}backoffice/monthly-subscription/cancel/${idSubscription}`,
        idSubscription
      )
      .toPromise();
  }

  deleteSubscription(idSubscription: string) {
    return this.http
      .delete<ResponseModel>(
        `${this.apiUrl}backoffice/monthly-subscription/${idSubscription}`
      )
      .toPromise();
  }

  createAccessProfile(profile: CreateProfilesModel) {
    return this.http
      .post<ResponseModel>(
        `${this.apiUrl}backoffice/monthly-subscription/profiles/`,
        profile
      )
      .toPromise();
  }

  getAllParking() {
    return this.http
      .get<ResponseModel>(`${this.apiUrl}backoffice/parking/enables`)
      .toPromise();
  }

  getParked(parkedFormValues: { parkingId: string; status: string }) {
    return this.http
      .post<ResponseModel>(
        `${this.apiUrl}backoffice/parking/parked`,
        parkedFormValues
      )
      .toPromise();
  }

  getOutParked(parkedId: string, status: number) {
    return this.http
      .post<ResponseModel>(`${this.apiUrl}backoffice/parking/getOut`, {
        parkedId,
        status,
      })
      .toPromise();
  }
}
