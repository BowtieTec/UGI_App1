import {Injectable} from '@angular/core'
import {MessageService} from 'src/app/shared/services/message.service'
import {environment} from '../../../../../environments/environment'
import {HttpClient} from '@angular/common/http'
import {ResponseModel} from 'src/app/shared/model/Request.model'
import {payFilter} from '../model/paymentModel'
import {map} from "rxjs/operators";
//import * as jsPDF from 'jspdf';

const EXCEL_TYPE =
  'application/vnd.openxlmformats-officedocument.spreedsheetml.sheet; charset = UTF-8'
const EXCEL_EXT = '.xlsx'

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  payDate: payFilter[] = new Array<payFilter>()
  private apiUrl = environment.serverAPI

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    //this.getInitialData();
  }

  getPaymentsRpt(initDate: string, endDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/getPagos/dates?initDate=${initDate}&endDate=${endDate}&parqueo=${parqueo}`
    )
  }

  getHistoryOfCourtesyRpt(initDate: string, endDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/historyOfCourtesies/dates?initDate=${initDate}&endDate=${endDate}&parqueo=${parqueo}`
    )
  }


  getTicketsRpt(initDate: string, endDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/ticketRpt/dates?initDate=${initDate}&endDate=${endDate}&parqueo=${parqueo}`
    )
  }

  getBillingRpt(initDate: string, endDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/getFacturas/dates?initDate=${initDate}&endDate=${endDate}&parqueo=${parqueo}`
    )
  }

  getTicketsDateRpt(initDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/ticketDetailRpt/dates?initDate=${initDate}&parqueo=${parqueo}`
    )
  }

  getDurationRpt(initDate: string, endDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/durationRpt/dates?initDate=${initDate}&endDate=${endDate}&parqueo=${parqueo}`
    )
  }

  getCourtesyRpt(parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/courtesiesDetail/info?parqueo=${parqueo}`
    )
  }

  getCourtesyStationRpt(initDate: string, endDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/courtesiesStationDetail/dates?initDate=${initDate}&endDate=${endDate}&parqueo=${parqueo}`
    )
  }

  getParkingMonthlyRpt(initDate: string, endDate: string, parqueo: string, telephone: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/parkingMonthlyRpt/dates?initDate=${initDate}&endDate=${endDate}&parqueo=${parqueo}&phoneNumber=${telephone}`
    ).pipe(
      map(res => {
          return res.data.map((item: any) => {
            return {
              phone_number: item.user.phone_number,
              name: `${item.user.name} ${item.user.lastName ?? ''}`,
              email: item.user.email,
              nit: item.billing?.buyer_nit ?? 'CF',
              amount_monthly: item.subscription?.amount,
              amount: item.amount ?? '',
              month_paid: item.month_paid ?? '',
              payment_date: new Date(item.created_at).toLocaleString(),
              trace_number: item.trace_number,
              certification_time: item.billing?.certification_time,
              noInvoice: item.billing?.fiscal_number && item.billing?.fiscal_number != ' ' ? item.billing?.fiscal_number : 'No generada',
              is_aproved: item.is_aproved,
              last_payment: item.subscription?.last_payment_date ?? '',
              parking: item.terminal?.parking.name
            }
          })
        }
      ))
  }

  getParkingRpt(initDate: string, endDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/parkingDailyMoSubRpt/dates?initDate=${initDate}&endDate=${endDate}&parqueo=${parqueo}`
    )
  }

  getParkingDateRpt(initDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/parkingDailyMoSubDetRpt/dates?initDate=${initDate}&parqueo=${parqueo}`
    )
  }
}
