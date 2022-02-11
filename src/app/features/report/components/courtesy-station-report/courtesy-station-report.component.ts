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

export interface desc {
  fecha: Date;
  total_v: number;
  total: number;
  descuento: number;
  pagado: number;
}



@Component({
  selector: 'app-courtesy-station-report',
  templateUrl: './courtesy-station-report.component.html',
  styleUrls: ['./courtesy-station-report.component.css']
})
export class CourtesyStationReportComponent implements OnInit {
  //@ViewChild(DataTableDirective)
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  pdfTable!: ElementRef;
  
  report: desc[] = [];
  dataSource: any;
  parqueo: any;


  allParking: ParkingModel[] = Array<ParkingModel>();
  verTodosLosParqueosReport = environment.verTodosLosParqueosReport;
  @ViewChild('inputParking') inputParking!: ElementRef;
  fechaActual = new Date().toISOString().split('T')[0];  

  datosUsuarioLogeado = this.auth.getParking();
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

  getCourtesyStationRpt(initDate:string,endDate:string) { 
    this.startDateReport = initDate;
    this.endDateReport = endDate;
    this.parqueo = this.datosUsuarioLogeado.id;
    if(this.ifHaveAction('verTodosLosParqueosReport')){
      this.parqueo = this.inputParking.nativeElement.value;
    }
    return this.reportService
     .getCourtesyStationRpt(initDate,endDate, this.parqueo)
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

  ngAfterViewInit() {
    this.dtTrigger.next();
    this.parqueo = this.datosUsuarioLogeado.id;
    if(this.ifHaveAction('verTodosLosParqueosReport')){
      this.parqueo = '0';
    }
    return this.reportService
     .getCourtesyStationRpt(this.fechaActual,this.fechaActual,this.parqueo)
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
      doc.save('Duracin.pdf')
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
        saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'Cortesias.xlsx');
      })
    });
    e.cancel = true; */
    const header = [
      "",
      "Cortesía", 
      "Parqueo", 
      "Local", 
      "Tipo", 
      "Cupones", 
      "Descuento",
      "Transacciones",
      "Disponibles",
      "Total descuento"
    ]
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('C. Estacionarias');
    //Add Row and formatting
    worksheet.addRow([]);
    
    let busienssRow = worksheet.addRow(['','','','EBI Go']);
    busienssRow.font = { name: 'Calibri', family: 4, size: 11,  bold: true }
    busienssRow.alignment = { horizontal: 'center', vertical: 'middle' }
    busienssRow.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('D2:J3');
    let ParqueoReporte = 'Todos los parqueos';
    if(this.parqueo != '0'){
      let parqueoEncontrado = this.allParking.find(parqueos => parqueos.id == this.parqueo);
      if(parqueoEncontrado){
        ParqueoReporte = parqueoEncontrado.name;
      }
    }
    let addressRow = worksheet.addRow(['','','',ParqueoReporte]);
    addressRow.font = { name: 'Calibri', family: 4, size: 11,  bold: true }
    addressRow.alignment = { horizontal: 'center', vertical: 'middle' }
    addressRow.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('D4:J5');
    let titleRow = worksheet.addRow(['','','','Reporte - Cortesias estacionarias']);
    titleRow.font = { name: 'Calibri', family: 4, size: 11,  bold: true }
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' }
    titleRow.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('D6:J8');
    //Add Image
    worksheet.mergeCells('B2:C8');
    let logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png',
    });
    worksheet.addImage(logo, 'B3:C6');
    worksheet.addRow([]);
    let infoRow = worksheet.addRow(['','Información General']);
    infoRow.font = { name: 'Calibri', family: 4, size: 11,  bold: true }
    infoRow.alignment = { horizontal: 'center', vertical: 'middle' }
    infoRow.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('B10:J11');
    worksheet.addRow([]);
    let header1 = worksheet.addRow(['','Fecha Inicio: '+this.startDateReport,'','','','Fecha Fin: '+this.endDateReport]);
    header1.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('B13:E14');
    worksheet.mergeCells('F13:J14');
    let header2 = worksheet.addRow(['','Total de cortesias: '+this.dataSource.length,'','','','Documento generado: '+ new Date().toISOString().slice(0,10) + ' ' + new Date().toLocaleTimeString()]);
    header2.eachCell((cell, number) => {
      if(number > 1){
        cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
    });
    worksheet.mergeCells('B15:E16');
    worksheet.mergeCells('F15:J16');
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
        d.cs_name,
        d.parqueo,
        d.comercio,
        d.cd_type,
        d.cd_quantity,
        d.cd_value,
        d.transacciones,
        d.disponibles,
        d.total_descuento
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

    worksheet.getColumn(2).width = 25;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 20;
    worksheet.getColumn(8).width = 25;
    worksheet.getColumn(9).width = 25;
    worksheet.getColumn(10).width = 15;
    worksheet.getColumn(11).width = 15;
    worksheet.getColumn(12).width = 15;
    worksheet.getColumn(13).width = 15;
    worksheet.getColumn(14).width = 15;
    worksheet.getColumn(15).width = 15;

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, 'ReporteCortesiasEstacionarias.xlsx');
    })
    e.cancel = true;
  }
}
