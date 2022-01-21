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
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';

export interface montlyPark {
  number: number;
  user: string;
  begin_date: Date;
  finish_date: Date;
  status: string;
  amount: number;
}

@Component({
  selector: 'app-parking-montly-report',
  templateUrl: './parking-montly-report.component.html',
  styleUrls: ['./parking-montly-report.component.css']
})
export class ParkingMontlyReportComponent implements OnInit {

  //@ViewChild(DataTableDirective)
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pdfTable!: ElementRef;
  
  report: montlyPark[] = [];
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

  getMontlyParkingRpt(initDate:string,endDate:string) { 
    return this.reportService
     .getParkingMonthlyRpt(initDate,endDate)
      .toPromise()
      .then((data) => {
        if (data.success) {
          console.log(data.data);
          this.report = data.data;
          this.dataSource = data.data;
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

  exportGrid(){
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
    }).then(() => {
      doc.save('Duracin.pdf')
    });
  }

  onExporting(e: any){
    const context = this;
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('General');

    exportDataGrid({
      component: context.dataGrid.instance,
      worksheet: worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer: any) => {
        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'Duracion.xlsx');
      })
    });
    e.cancel = true;
  }

}
