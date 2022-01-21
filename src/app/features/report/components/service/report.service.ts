import { Injectable } from '@angular/core';
import { MessageService } from 'src/app/shared/services/message.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from 'src/app/shared/model/Request.model';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { payFilter } from '../model/paymentModel';
//import * as jsPDF from 'jspdf';
 

const EXCEL_TYPE = 'application/vnd.openxlmformats-officedocument.spreedsheetml.sheet; charset = UTF-8';
const EXCEL_EXT=  '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  payDate: payFilter[] = new Array<payFilter>();
  private apiUrl = environment.serverAPI;
 

  constructor(
    private http: HttpClient,
    private messageService: MessageService,

    ) {
      //this.getInitialData();
    }
    
    getPaymentsRpt(initDate:string,endDate:string) {
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/getPagos/dates?initDate=${initDate}&endDate=${endDate}`       
      );
    }

    getTicketsRpt(initDate:string,endDate:string) {   
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/ticketRpt/dates?initDate=${initDate}&endDate=${endDate}`       
      );
    }

    getTicketsDateRpt(initDate:string) {   
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/ticketDetailRpt/dates?initDate=${initDate}`       
      );
    }

    getDurationRpt(initDate:string,endDate:string) {  
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/durationRpt/dates?initDate=${initDate}&endDate=${endDate}`       
      );
    }

    getCourtesyRpt(initDate:string,endDate:string) {   
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/courtesiesDetail/dates?initDate=${initDate}&endDate=${endDate}`       
      );
    }

    getParkingMonthlyRpt(initDate:string,endDate:string) {   
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/parkingMonthlyRpt/dates?initDate=${initDate}&endDate=${endDate}`       
      );
    }

    getParkingRpt(initDate:string,endDate:string) {   
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/parkingDailyMoSubRpt/dates?initDate=${initDate}&endDate=${endDate}`       
      );
    }

    getParkingDateRpt(initDate:string) {   
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/parkingDailyMoSubDetRpt/dates?initDate=${initDate}`       
      );
    }
    
}
