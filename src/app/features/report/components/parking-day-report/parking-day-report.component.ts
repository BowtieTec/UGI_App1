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
import { saveAs } from 'file-saver';

import { ParkingService } from '../../../parking/services/parking.service';
import { ParkingModel } from '../../../parking/models/Parking.model';
import * as logoFile from '../logoEbi';

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
  parqueo: any;


  allParking: ParkingModel[] = Array<ParkingModel>();
  verTodosLosParqueosReport = environment.verTodosLosParqueosReport;
  @ViewChild('inputParking') inputParking!: ElementRef;
  fechaActual = new Date().toISOString().split('T')[0];  

  datosUsuarioLogeado = this.auth.getParking();
  parqueoDetalle = '0';
  startDateReport: any;
  endDateReport: any;

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
    this.startDateReport = initDate;
    this.endDateReport = endDate;
    this.parqueo = this.datosUsuarioLogeado.id;
    if(this.ifHaveAction('verTodosLosParqueosReport')){
      this.parqueo = this.inputParking.nativeElement.value;
    }
    this.parqueoDetalle = this.parqueo;
    return this.reportService
     .getParkingRpt(initDate,endDate, this.parqueo)
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
    this.parqueo = this.datosUsuarioLogeado.id;
    if(this.ifHaveAction('verTodosLosParqueosReport')){
      this.parqueo = '0';
    }
    this.parqueoDetalle = this.parqueo;
    return this.reportService
     .getParkingRpt(this.fechaActual,this.fechaActual,this.parqueo)
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
    /* const context = this;
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
    e.cancel = true; */
    const header = [
      "",
      "Fecha", 
      "Total de vehículos", 
      "Total", 
      "Descuento", 
      "Pagado"
    ]
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Ebi Go Mensual');
    //Add Row and formatting
    worksheet.addRow([]);
    
    let busienssRow = worksheet.addRow(['','','','EBI Go']);
    busienssRow.font = { name: 'Calibri', family: 4, size: 11, bold: true }
    busienssRow.alignment = { horizontal: 'center', vertical: 'middle' }
    busienssRow.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('D2:F3');
    let ParqueoReporte = 'Todos los parqueos';
    if(this.parqueo != '0'){
      let parqueoEncontrado = this.allParking.find(parqueos => parqueos.id == this.parqueo);
      if(parqueoEncontrado){
        ParqueoReporte = parqueoEncontrado.name;
      }
    }
    let addressRow = worksheet.addRow(['','','',ParqueoReporte]);
    addressRow.font = { name: 'Calibri', family: 4, size: 11, bold: true }
    addressRow.alignment = { horizontal: 'center', vertical: 'middle' }
    addressRow.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('D4:F5');
    let titleRow = worksheet.addRow(['','','','Reporte - Ebi Go Mensual']);
    titleRow.font = { name: 'Calibri', family: 4, size: 11, bold: true }
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' }
    titleRow.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('D6:F8');
    //Add Image
    worksheet.mergeCells('B2:C8');
    let logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });
    worksheet.addImage(logo, 'B3:C6');
    worksheet.addRow([]);
    let infoRow = worksheet.addRow(['','Información General']);
    infoRow.font = { name: 'Calibri', family: 4, size: 11, bold: true }
    infoRow.alignment = { horizontal: 'center', vertical: 'middle' }
    infoRow.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('B10:F11');
    worksheet.addRow([]);
    let header1 = worksheet.addRow(['','Fecha Inicio: '+this.startDateReport,'','','Fecha Fin: '+this.endDateReport]);
    header1.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('B13:D14');
    worksheet.mergeCells('E13:F14');
    let header2 = worksheet.addRow(['','Total de días con ingreso: '+this.dataSource.length,'','','Documento generado: '+ new Date().toISOString().slice(0,10) + ' ' + new Date().toLocaleTimeString()]);
    header2.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('B15:D16');
    worksheet.mergeCells('E15:F16');
    worksheet.addRow([]);
    let headerRow = worksheet.addRow(header);
    
    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      if(number > 1){
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
          bgColor: { argb: 'FF0000FF' }
        }
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    })
    // Add Data and Conditional Formatting
    this.dataSource.forEach((d:any) => {
      let row = worksheet.addRow([
        '',
        d.fecha?new Date(d.fecha).toLocaleDateString():' ',
        d.total_v,
        d.total,
        d.descuento,
        d.pagado
      ]);
      row.eachCell((cell, number) => {
        if(number > 1){
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        }
      });
    }
    );
    worksheet.addRow([]);
    worksheet.addRow([]);
    worksheet.addRow([]);
    /* let headerResumen = worksheet.addRow(['','Fecha','Total de vehiculos','Total de ingresos','Total de descuento','Total pagado']);
    headerResumen.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    let groupData = this.dataSource.reduce((r:any, a:any) =>{
      r[a.ep_entry_date.slice(0,10)] = [...r[a.ep_entry_date.slice(0,10)] || [], a];
      return r;
    },{});
    Object.entries(groupData).forEach(([key,value]) => {
      let valor = JSON.parse(JSON.stringify(value));
      let total = 0;
      let descuento = 0;
      let pagado = 0;
      valor.forEach((element:any) => {
        total+= +element.total;
        descuento+= +element.descuento;
        pagado+= +element.pagado;
      });
      let detailResumen = worksheet.addRow(['',key,valor.length,total,descuento,pagado]);
      detailResumen.eachCell((cell, number) => {
        if(number > 1){
          cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        }
      });
    }); */

    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'ReporteEbiGoMensual.xlsx');
    })
    e.cancel = true;
  } 
}
