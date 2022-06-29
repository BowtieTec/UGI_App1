import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { DxDataGridComponent } from 'devextreme-angular'
import { DataTableDirective } from 'angular-datatables'
import { Subject } from 'rxjs'
import { ParkingModel } from '../../../parking/models/Parking.model'
import { environment } from '../../../../../environments/environment'
import { AuthService } from '../../../../shared/services/auth.service'
import { ReportService } from '../service/report.service'
import { MessageService } from '../../../../shared/services/message.service'
import { UtilitiesService } from '../../../../shared/services/utilities.service'
import { PermissionsService } from '../../../../shared/services/permissions.service'
import { ParkingService } from '../../../parking/services/parking.service'
import { DataTableOptions } from '../../../../shared/model/DataTableOptions'
import { jsPDF } from 'jspdf'
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter'
import { Workbook } from 'exceljs'
import * as logoFile from '../logoEbi'
import { saveAs } from 'file-saver'

export interface historyOfCourtesy {
  completeName: string
  noFactura: string
  estacionEntrada: string
  cd_name: string
  pagado: number
  cd_entry_date: Date
}

@Component({
  selector: 'app-history-courtesy',
  templateUrl: './history-courtesy.component.html',
  styleUrls: ['./history-courtesy.component.css']
})
export class HistoryCourtesyComponent implements OnInit, AfterViewInit {
  @ViewChild(DxDataGridComponent, {static: false})
  dataGrid!: DxDataGridComponent
  dtElement!: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject()
  pdfTable!: ElementRef

  report: historyOfCourtesy[] = []
  dataSource: any
  parqueo: any
  nowDateTime = new Date()
  allParking: ParkingModel[] = Array<ParkingModel>()
  verTodosLosParqueosReport = environment.verTodosLosParqueosReport
  @ViewChild('inputParking') inputParking!: ElementRef
  fechaActual = new Date().toISOString().split('T')[0]

  datosUsuarioLogeado = this.auth.getParking()

  startDateReport: any
  endDateReport: any

  constructor(
    private auth: AuthService,
    private reportService: ReportService,
    private messageService: MessageService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService,
    private permisionService: PermissionsService,
    private excelService: ReportService,
    private parkingService: ParkingService
  ) {
  }

  ngOnInit(): void {
    this.messageService.showLoading()
    this.dtOptions = DataTableOptions.getSpanishOptions(10)
    this.parkingService.getAllParking().then((data) => {
      if (data.success) {
        this.allParking = data.data.parkings
      }
      this.messageService.hideLoading()
    })
  }

  ifHaveAction(action: string) {
    return this.permisionService.ifHaveAction(action)
  }

  get isSudo() {
    return this.authService.isSudo
  }

  getHistoryOfCourtesyRpt(initDate: string, endDate: string) {
    if (endDate < initDate) {
      this.messageService.error(
        '',
        'La fecha de inicio debe ser mayor a la fecha fin'
      )
      return
    }

    this.startDateReport = new Date(initDate + 'T00:00:00').toLocaleDateString('es-GT')
    this.endDateReport = new Date(endDate + 'T00:00:00').toLocaleDateString('es-GT')
    this.parqueo = this.datosUsuarioLogeado.id
    if (this.ifHaveAction('verTodosLosParqueosReport')) {
      this.parqueo = this.inputParking.nativeElement.value
    }
    return this.reportService
      .getHistoryOfCourtesyRpt(initDate, endDate, this.parqueo)
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.report = data.data
          this.dataSource = data.data
          if (this.report.length == 0) {
            this.messageService.infoTimeOut('No se encontraron datos')
          }
          this.rerender()
        } else {
          this.messageService.error('', data.message)
        }
      })
      .then(() => {
        this.messageService.hideLoading()
      })
  }

  ngAfterViewInit() {
    this.dtTrigger.next()
    this.parqueo = this.datosUsuarioLogeado.id
    if (this.ifHaveAction('verTodosLosParqueosReport')) {
      this.parqueo = '0'
    }
  }

  exportGrid() {
    if (this.report.length == 0) {
      this.messageService.infoTimeOut('No hay información para exportar')
      return
    }
    const doc = new jsPDF()
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
    }).then(() => {
      doc.save('Duracin.pdf')
    })
  }

  onExporting(e: any) {
    if (this.report.length == 0) {
      this.messageService.infoTimeOut('No hay información para exportar')
      return
    }

    const header = [
      '',
      'Parqueo',
      'Nombre de cliente',
      'Nit',
      'Fecha de ingreso',
      'Hora de ingreso',
      'Fecha de Salida',
      'Hora de Salida',
      'Cortesia Aplicada',
      'Sub monto (Q)',
      'Descuento (Q)',
      'Total (Q)',
      'Estación de ingreso',
      'Estación de Salida',
      'No. Factura',
      'Trace Number',
    ]
    //Create workbook and worksheet
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Historial de cortesias')
    //Add Row and formatting
    worksheet.addRow([])

    const busienssRow = worksheet.addRow(['', '', '', 'ebiGO'])
    busienssRow.font = {name: 'Calibri', family: 4, size: 11, bold: true}
    busienssRow.alignment = {horizontal: 'center', vertical: 'middle'}
    busienssRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'}
        }
      }
    })
    worksheet.mergeCells('D2:P3')
    let ParqueoReporte = 'Todos los parqueos'
    if (this.parqueo != '0') {
      const parqueoEncontrado = this.allParking.find(
        (parqueos) => parqueos.id == this.parqueo
      )
      if (parqueoEncontrado) {
        ParqueoReporte = parqueoEncontrado.name
      }
    }
    const addressRow = worksheet.addRow(['', '', '', ParqueoReporte])
    addressRow.font = {name: 'Calibri', family: 4, size: 11, bold: true}
    addressRow.alignment = {horizontal: 'center', vertical: 'middle'}
    addressRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'}
        }
      }
    })
    worksheet.mergeCells('D4:P5')
    const titleRow = worksheet.addRow(['', '', '', 'Reporte - Historial de cortesias'])
    titleRow.font = {name: 'Calibri', family: 4, size: 11, bold: true}
    titleRow.alignment = {horizontal: 'center', vertical: 'middle'}
    titleRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'}
        }
      }
    })
    worksheet.mergeCells('D6:P8')
    //Add Image
    worksheet.mergeCells('B2:C8')
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png'
    })
    worksheet.addImage(logo, 'B3:C6')
    worksheet.addRow([])
    const infoRow = worksheet.addRow(['', 'Información General'])
    infoRow.font = {name: 'Calibri', family: 4, size: 11, bold: true}
    infoRow.alignment = {horizontal: 'center', vertical: 'middle'}
    infoRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'}
        }
      }
    })
    worksheet.mergeCells('B10:P11')
    worksheet.addRow([])
    const header1 = worksheet.addRow([
      '',
      'Fecha Inicio: ' + this.startDateReport,
      '',
      '',
      '',
      '',
      '',
      '',
      'Fecha Fin: ' + this.endDateReport
    ])
    header1.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'}
        }
      }
    })
    worksheet.mergeCells('B13:H14')
    worksheet.mergeCells('I13:P14')
    const header2 = worksheet.addRow([
      '',
      'Total de cortesias aplicadas: ' + this.dataSource.length,
      '',
      '',
      '',
      '',
      '',
      '',
      'Documento generado: ' +
      new Date().toLocaleDateString('es-GT') +
      '  ' +
      new Date().toLocaleTimeString()
    ])
    header2.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'}
        }
      }
    })
    worksheet.mergeCells('B15:H16')
    worksheet.mergeCells('I15:P16')
    worksheet.addRow([])
    const headerRow = worksheet.addRow(header)

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: {argb: 'FFFFFF00'},
          bgColor: {argb: 'FF0000FF'}
        }
        cell.border = {
          top: {style: 'thin'},
          left: {style: 'thin'},
          bottom: {style: 'thin'},
          right: {style: 'thin'}
        }
      }
    })
    // Add Data and Conditional Formatting
    this.dataSource.forEach((d: any) => {
      const row = worksheet.addRow([
        '',
        d.p_name,
        d.completeName,
        d.b_buyer_nit,
        d.ep_entry_date ? new Date(d.ep_entry_date).toLocaleDateString() : ' ',
        d.ep_entry_date ? new Date(d.ep_entry_date).toLocaleTimeString() : ' ',
        d.ep_exit_date ? new Date(d.ep_exit_date).toLocaleDateString() : ' ',
        d.ep_exit_date ? new Date(d.ep_exit_date).toLocaleTimeString() : ' ',
        d.cd_name,
        d.total,
        d.descuento,
        d.pagado,
        d.estacionEntrada,
        d.estacionSalida ? d.estacionSalida : ' ',
        d.noFactura,
        d.trace_number,
      ])
      row.eachCell((cell, number) => {
        if (number > 1) {
          cell.border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            bottom: {style: 'thin'},
            right: {style: 'thin'}
          }
        }
      })
    })
    worksheet.addRow([])
    worksheet.addRow([])
    worksheet.addRow([])


    worksheet.getColumn(2).width = 25
    worksheet.getColumn(3).width = 25
    worksheet.getColumn(4).width = 15
    worksheet.getColumn(5).width = 20
    worksheet.getColumn(6).width = 20
    worksheet.getColumn(7).width = 20
    worksheet.getColumn(8).width = 20
    worksheet.getColumn(9).width = 25
    worksheet.getColumn(10).width = 15
    worksheet.getColumn(11).width = 15
    worksheet.getColumn(12).width = 15
    worksheet.getColumn(13).width = 25
    worksheet.getColumn(14).width = 25
    worksheet.getColumn(15).width = 15
    worksheet.getColumn(16).width = 15

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      saveAs(blob, 'ReporteHistorialDeCortesias.xlsx')
    })
    e.cancel = true
  }

  private rerender() {
    if (this.dtElement != undefined) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy()
        this.dtTrigger.next()
      })
    }
  }
}
