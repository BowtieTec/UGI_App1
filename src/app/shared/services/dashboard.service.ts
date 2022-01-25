import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../model/Request.model';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  actions: string[] = [];
  private apiUrl = environment.serverAPI;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  get actionsOfDashboard() {
    return this.actions;
  }

  //Entradas
  getDailyEntries(parkingId: string, fecha: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/dashboard/daily-entries/${parkingId}/${fecha}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  getMonthlyEntries(parkingId: string, mes: string, anio: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/dashboard/monthly-entries/${parkingId}/${anio}/${mes}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  getYearEntries(parkingId: string, anio: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/dashboard/year-entries/${parkingId}/${anio}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  //Cortesias
  getDailyCourtesies(parkingId: string, fecha: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/dashboard/daily-courtesy/${parkingId}/${fecha}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  getMonthlyCourtesies(parkingId: string, mes: string, anio: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/dashboard/monthly-courtesy/${parkingId}/${anio}/${mes}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  getYearCourtesies(parkingId: string, anio: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/dashboard/year-courtesy/${parkingId}/${anio}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  //Flujo
  getDailyPayments(parkingId: string, fecha: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/dashboard/daily-payment/${parkingId}/${fecha}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  getMonthlyPayments(parkingId: string, mes: string, anio: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/dashboard/monthly-payment/${parkingId}/${anio}/${mes}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  getYearPayments(parkingId: string, anio: string) {
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/dashboard/year-payment/${parkingId}/${anio}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }
}
