import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { paymentModel } from '../model/paymentModel';
import { MessageService } from '../../../../shared/services/message.service';
import { DataTableOptions } from '../../../../shared/model/DataTableOptions';
import { ReportService } from '../service/report.service';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { PermissionsService } from '../../../../shared/services/permissions.service';
import { environment } from 'src/environments/environment';
import { jsPDF } from 'jspdf';
import { DxDataGridComponent } from 'devextreme-angular';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

import 'jspdf-autotable';

/* export interface tickets {
  name: string;
  last_name: string;
  email: string;
  phone_number: string;
  amount: number;
  created_at: Date;
} */

export interface tickets {
  fecha: Date;
  total_v: number;
  total: number;
  descuento: number;
  pagado: number;
}



@Component({
  selector: 'app-parking-ticket-report',
  templateUrl: './parking-ticket-report.component.html',
  styleUrls: ['./parking-ticket-report.component.css']
})
export class ParkingTicketReportComponent implements OnInit {
  //@ViewChild(DataTableDirective)
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pdfTable!: ElementRef;
  
  report: tickets[] = [];
  dataSource: any;

  constructor(
    private reportService: ReportService,
    private messageService: MessageService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permisionService: PermissionsService,
    private excelService: ReportService,
  ) 
  {
    this.messageService.showLoading();

    this.messageService.hideLoading();
  }

  ngOnInit(): void {
    this.dtOptions = DataTableOptions.getSpanishOptions(10);
  }

  ifHaveAction(action: string) {
    return this.permisionService.ifHaveAction(action);
  }

  getInitialData() {
    // Calling 
  //this.getPaymentRpt();
  }

  getTicketRpt(initDate:string,endDate:string) { 
    console.log(initDate,endDate);
    return this.reportService
     .getTicketsRpt(initDate,endDate)
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.report = data.data;
          this.dataSource = data.data;
          console.log(this.dataSource);
          console.log(data.data);
          this.rerender();
        } else {
          this.messageService.error('', data.message);
        }
      })
      .then(() => {
        this.messageService.hideLoading();
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  private rerender() {
    if (this.dtElement != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
  }


  exportAsXLSX(){
    // this.reportService
    
    this.excelService.exportToExcel(this.report,'reporte Tickets');  
  }

  exportGrid(){
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
    }).then(() => {
      doc.save('TicketDia.pdf')
    });
  }

}
