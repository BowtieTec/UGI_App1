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

  descriptionOfDiffOfTime(oldTime: Date, timeNow: Date) {
    if (!timeNow) {
      return 'No ha salido del parqueo'
    }
    let days: number = timeNow.getDay() - oldTime.getDay()
    let hours: number = timeNow.getHours() - oldTime.getHours()
    let minutes: number = timeNow.getMinutes() - oldTime.getMinutes()
    if (minutes < 0) {
      hours--
      minutes += 60
    }
    if (hours < 0) {
      days--
      hours += 24
    }
    if (days < 0) {
      days += 7
    }
    let response: string = ''

    if (days > 0 && hours > 0 && minutes > 0) return `${days} días, ${hours} horas y ${minutes} minutos`
    if (days > 0 && hours > 0 && minutes === 0) return `${days} días, ${hours} horas`
    if (days > 0 && hours === 0 && minutes > 0) return `${days} días y ${minutes} minutos`
    if (days > 0 && hours === 0 && minutes === 0) return `${days} días`
    if (days === 0 && hours > 0 && minutes > 0) return `${hours} horas y ${minutes} minutos`
    if (days === 0 && hours > 0 && minutes === 0) return `${hours} horas`
    if (days === 0 && hours === 0 && minutes > 0) return `${minutes} minutos`
    if (days === 0 && hours === 0 && minutes === 0) return '0 minutos'

    return response
  }

  getParkingRpt(initDate: string, endDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/parkingDailyMoSubRpt/dates?initDate=${initDate}&endDate=${endDate}&parqueo=${parqueo}`
    ).pipe(map((res: any) => {
      return res.data.map((item: any) => {
        return {
          id: item.id,
          name: `${item.user.name ?? ''} ${item.user.lastName ?? ''}`,
          email: item.user.email,
          gender: item.user.gender == 2 ? 'Masculino' : 'Femenino',
          phone_number: item.user.phone_number,
          entry_date: item.entry_date.toLocaleString() ?? '',
          exit_date: item.exit_date.toLocaleString() ?? '',
          timeIn: this.descriptionOfDiffOfTime(new Date(item.entry_date), new Date(item.exit_date)),
          entry_station: item.entry_station.name ?? '',
          exit_station: item.exit_station.name ?? '',
          type: item.type == 1 ? 'ebiGo Ticket' : 'ebiGo Mensual'
        }
      })

    }))
  }

  getParkingDateRpt(initDate: string, parqueo: string) {
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/report/parkingDailyMoSubDetRpt/dates?initDate=${initDate}&parqueo=${parqueo}`
    )
  }
}
