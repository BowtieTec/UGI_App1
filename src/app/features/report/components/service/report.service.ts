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
      
      console.log('Llamando API -->'+initDate,endDate );
      console.log(`${this.apiUrl}backoffice/report/getPagos/${initDate},${endDate}`);
      //this.messageService.showLoading();
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/getPagos/dates?initDate=${initDate}&endDate=${endDate}`       
      );
    }

    getTicketsRpt(initDate:string,endDate:string) {   
      console.log('Llamando API -->'+initDate,endDate );
      console.log(`${this.apiUrl}backoffice/report/parkingRpt/dates?initDate=${initDate}&endDate=${endDate}`);
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
      console.log(`${this.apiUrl}backoffice/report/durationRpt/dates?initDate=${initDate},${endDate}`); 
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/durationRpt/dates?initDate=${initDate}&endDate=${endDate}`       
      );
    }

    getDescountRpt(initDate:string,endDate:string) {   
      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/descountRpt/dates?initDate=${initDate}&endDate=${endDate}`       
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
    
    




    // this function purpose is for test the end poing
    testEndPoint () {
      console.log('running testEndPoint from');
      /* End Points */
        // ticketRpt --> listo
        //parkingRpt -->   
        //durationRpt --> listo
        // parkingMonthlyRpt 
        //parkingDailyMoSubRpt/dates

            //filter 
            let initDate = "2021-06-15";
            let endDate = "2021-12-31";

      //this.messageService.showLoading();

      return this.http.get<ResponseModel>(
        `${this.apiUrl}backoffice/report/parkingDailyMoSubRpt/dates?initDate=${initDate}&endDate=${endDate}`
      );  
    }

   exportToExcel(json: any[],excelFileName: string): void 
    {
      const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook : XLSX.WorkBook = {
      Sheets:{'data': worksheet},
      SheetNames:['data']
    };
      const excelBuffer: any = XLSX.write(workbook,{bookType:'xlsx',type:'array'}) 
      //llamamos a metodo y el filename
      this.saveAsExcel(excelBuffer,excelFileName);

    }

    private saveAsExcel (buffer:any, filename: string ):void{
      const data:Blob= new Blob([buffer],{type:EXCEL_TYPE});
      FileSaver.saveAs(data, filename + '_export_' + new Date().getTime() + EXCEL_EXT);

    }




}
