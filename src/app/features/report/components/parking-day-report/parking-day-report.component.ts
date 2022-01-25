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

import { ParkingService } from '../../../parking/services/parking.service';
import { ParkingModel } from '../../../parking/models/Parking.model';

export interface dayPark {
  fecha: Date;
  total_v: number;
  total: number;
  descuento: number;
}

@Component({
  selector: 'app-parking-day-report',
  templateUrl: './parking-day-report.component.html',
  styleUrls: ['./parking-day-report.component.css']
})
export class ParkingDayReportComponent implements OnInit {
  //@ViewChild(DataTableDirective)
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pdfTable!: ElementRef;
  
  report: dayPark[] = [];
  dataSource: any;

  allParking: ParkingModel[] = Array<ParkingModel>();
  verTodosLosParqueosReport = environment.verTodosLosParqueosReport;
  @ViewChild('inputParking') inputParking!: ElementRef;
  fechaActual = new Date().toISOString().split('T')[0];  

  datosUsuarioLogeado = this.auth.getParking();
  parqueoDetalle = '0';

  constructor(
    private auth: AuthService,
    private reportService: ReportService,
    private messageService: MessageService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permisionService: PermissionsService,
    private excelService: ReportService,
    private parkingService: ParkingService,
  )

  {
    this.messageService.showLoading();

    this.messageService.hideLoading();
  }

  ngOnInit(): void {
    this.dtOptions = DataTableOptions.getSpanishOptions(10);
    this.parkingService.getAllParking().then((data) => {
      if (data.success) {
        this.allParking = data.data.parkings;
      }
    });
  }

  ifHaveAction(action: string) {
    return this.permisionService.ifHaveAction(action);
  }

  getInitialData() {
    // Calling 
  //this.getPaymentRpt();
  }

  getParkingsRpt(initDate:string,endDate:string) { 
    let parqueo = this.datosUsuarioLogeado.id;
    if(this.ifHaveAction('verTodosLosParqueosReport')){
      parqueo = this.inputParking.nativeElement.value;
    }
    this.parqueoDetalle =parqueo;
    return this.reportService
     .getParkingRpt(initDate,endDate, parqueo)
      .toPromise()
      .then((data) => {
        if (data.success) {
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

  ngAfterViewInit() {
    this.dtTrigger.next();
    let parqueo = this.datosUsuarioLogeado.id;
    if(this.ifHaveAction('verTodosLosParqueosReport')){
      parqueo = '0';
    }
    this.parqueoDetalle =parqueo;
    return this.reportService
     .getParkingRpt(this.fechaActual,this.fechaActual,parqueo)
      .toPromise()
      .then((data) => {
        if (data.success) {
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
      doc.save('TicketMensuak.pdf')
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
        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'GeneralMensual.xlsx');
      })
    });
    e.cancel = true;
  } 
}
