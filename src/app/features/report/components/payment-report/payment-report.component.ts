import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core'
import { DataTableDirective } from 'angular-datatables'
import { Subject } from 'rxjs'
import { MessageService } from '../../../../shared/services/message.service'
import { DataTableOptions } from '../../../../shared/model/DataTableOptions'
import { ReportService } from '../service/report.service'
import { UtilitiesService } from '../../../../shared/services/utilities.service'
import { AuthService } from '../../../../shared/services/auth.service'
import { PermissionsService } from '../../../../shared/services/permissions.service'
import { environment } from 'src/environments/environment'
import { jsPDF } from 'jspdf'
import { DxDataGridComponent } from 'devextreme-angular'
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter'
import { Workbook } from 'exceljs'
import { saveAs } from 'file-saver'

import { ParkingService } from '../../../parking/services/parking.service'
import { ParkingModel } from '../../../parking/models/Parking.model'
import * as logoFile from '../logoEbi'

export interface pagos {
  name: string
  last_name: string
  email: string
  phone_number: string
  amount: number
  created_at: Date
}

@Component({
  selector: 'app-payment-report',
  templateUrl: './payment-report.component.html',
  styleUrls: ['./payment-report.component.css']
})
export class PaymentReportComponent implements OnInit, AfterViewInit {
  //report = new MatTableDataSource(report)
  //@ViewChild(DataTableDirective)
  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid!: DxDataGridComponent
  dtElement!: DataTableDirective
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject()
  pdfTable!: ElementRef

  report: pagos[] = []
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
  ) {}

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

  getPaymentRpt(initDate: string, endDate: string) {
    if (endDate < initDate) {
      this.messageService.error(
        '',
        'La fecha de inicio debe ser mayor a la fecha fin'
      )
      return
    }
    this.startDateReport = initDate
    this.endDateReport = endDate
    this.parqueo = this.datosUsuarioLogeado.id
    if (this.ifHaveAction('verTodosLosParqueosReport')) {
      this.parqueo = this.inputParking.nativeElement.value
    }
    return this.reportService
      .getPaymentsRpt(initDate, endDate, this.parqueo)
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.report = data.data
          this.dataSource = data.data
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
    const doc = new jsPDF()
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: this.dataGrid.instance
    }).then(() => {
      doc.save('Duracin.pdf')
    })
  }

  onExporting(e: any) {
    /*     const context = this;
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Pagos');

        exportDataGrid({
          component: context.dataGrid.instance,
          worksheet: worksheet,
          autoFilterEnabled: true,
        }).then(() => {
          workbook.xlsx.writeBuffer().then((buffer: any) => {
            let xmlString="<table><tr><td>Hola</td></tr></table>";
            let wrapper = document.createElement('div');
            wrapper.innerHTML = xmlString;
            saveAs(new Blob([wrapper.innerHTML], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}), 'Pagos.xlsx');
          })
        }); */
    const header = [
      '',
      'Codigo cliente',
      'Fecha de ingreso',
      'Hora de ingreso',
      'Fecha de salida',
      'Hora de salida',
      'Tiempo estacionado',
      'Linea de ingreso',
      'Linea de egreso',
      'Sub monto',
      'Tipo cortesia',
      'Monto/Tiempo',
      'Total',
      'Factura',
      'Id Descuento'
    ]
    //Create workbook and worksheet
    const workbook = new Workbook()
    const worksheet = workbook.addWorksheet('Pagos por fecha')
    //Add Row and formatting
    worksheet.addRow([])

    const busienssRow = worksheet.addRow(['', '', '', 'ebiGO'])
    busienssRow.font = { name: 'Calibri', family: 4, size: 11, bold: true }
    busienssRow.alignment = { horizontal: 'center', vertical: 'middle' }
    busienssRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    worksheet.mergeCells('D2:O3')
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
    addressRow.font = { name: 'Calibri', family: 4, size: 11, bold: true }
    addressRow.alignment = { horizontal: 'center', vertical: 'middle' }
    addressRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    worksheet.mergeCells('D4:O5')
    const titleRow = worksheet.addRow(['', '', '', 'Reporte - Pago de parqueo'])
    titleRow.font = { name: 'Calibri', family: 4, size: 11, bold: true }
    titleRow.alignment = { horizontal: 'center', vertical: 'middle' }
    titleRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    worksheet.mergeCells('D6:O8')
    //Add Image
    worksheet.mergeCells('B2:C8')
    const logo = workbook.addImage({
      base64: logoFile.logoBase64,
      extension: 'png'
    })
    worksheet.addImage(logo, 'B3:C6')
    worksheet.addRow([])
    const infoRow = worksheet.addRow(['', 'Información General'])
    infoRow.font = { name: 'Calibri', family: 4, size: 11, bold: true }
    infoRow.alignment = { horizontal: 'center', vertical: 'middle' }
    infoRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    worksheet.mergeCells('B10:O11')
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
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    worksheet.mergeCells('B13:H14')
    worksheet.mergeCells('I13:O14')
    const header2 = worksheet.addRow([
      '',
      'Total de vehiculos que ingresaron: ' + this.dataSource.length,
      '',
      '',
      '',
      '',
      '',
      '',
      'Documento generado: ' +
        new Date().toISOString().slice(0, 10) +
        ' ' +
        new Date().toLocaleTimeString()
    ])
    header2.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    worksheet.mergeCells('B15:H16')
    worksheet.mergeCells('I15:O16')
    worksheet.addRow([])
    const headerRow = worksheet.addRow(header)

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      if (number > 1) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00' },
          bgColor: { argb: 'FF0000FF' }
        }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    // Add Data and Conditional Formatting
    this.dataSource.forEach((d: any) => {
      const row = worksheet.addRow([
        '',
        d.phone_key,
        d.ep_entry_date ? new Date(d.ep_entry_date).toLocaleDateString() : ' ',
        d.ep_entry_date ? new Date(d.ep_entry_date).toLocaleTimeString() : ' ',
        d.ep_exit_date ? new Date(d.ep_exit_date).toLocaleDateString() : ' ',
        d.ep_exit_date ? new Date(d.ep_exit_date).toLocaleTimeString() : ' ',
        d.diferencia,
        d.estacionEntrada,
        d.estacionSalida ? d.estacionSalida : ' ',
        d.total,
        d.cd_type,
        d.descuento,
        d.pagado,
        d.py_billingId ? d.py_billingId : ' ',
        d.courtesyId ? d.courtesyId : ' '
      ])
      row.eachCell((cell, number) => {
        if (number > 1) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
      })
    })
    worksheet.addRow([])
    worksheet.addRow([])
    worksheet.addRow([])
    const headerResumen = worksheet.addRow([
      '',
      'Fecha',
      'Total de vehiculos',
      'Total de ingresos',
      'Total de descuento',
      'Total pagado'
    ])
    headerResumen.eachCell((cell, number) => {
      if (number > 1) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        }
      }
    })
    const groupData = this.dataSource.reduce((r: any, a: any) => {
      r[a.ep_entry_date.slice(0, 10)] = [
        ...(r[a.ep_entry_date.slice(0, 10)] || []),
        a
      ]
      return r
    }, {})
    Object.entries(groupData).forEach(([key, value]) => {
      const valor = JSON.parse(JSON.stringify(value))
      let total = 0
      let descuento = 0
      let pagado = 0
      valor.forEach((element: any) => {
        total += +element.total
        descuento += +element.descuento
        pagado += +element.pagado
      })
      const detailResumen = worksheet.addRow([
        '',
        key,
        valor.length,
        total,
        descuento,
        pagado
      ])
      detailResumen.eachCell((cell, number) => {
        if (number > 1) {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
      })
    })

    worksheet.getColumn(2).width = 15
    worksheet.getColumn(3).width = 20
    worksheet.getColumn(4).width = 20
    worksheet.getColumn(5).width = 20
    worksheet.getColumn(6).width = 20
    worksheet.getColumn(7).width = 20
    worksheet.getColumn(8).width = 25
    worksheet.getColumn(9).width = 25
    worksheet.getColumn(10).width = 15
    worksheet.getColumn(11).width = 15
    worksheet.getColumn(12).width = 15
    worksheet.getColumn(13).width = 15
    worksheet.getColumn(14).width = 15
    worksheet.getColumn(15).width = 15

    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      })
      saveAs(blob, 'ReportePagos.xlsx')
    })
    e.cancel = true
  }

  getTimeInParking(rowData: any) {
    const oldTime = new Date(rowData.ep_entry_date).getTime()
    const timeNow = new Date(rowData.ep_exit_date).getTime()
    const days = Math.round((timeNow - oldTime) / (1000 * 60 * 60 * 24))
    const hours = Math.round(
      (Math.abs(timeNow - oldTime) / (1000 * 60 * 60)) % 24
    )
    const minutes = Math.round((Math.abs(timeNow - oldTime) / (1000 * 60)) % 60)

    if (days > 0) return `${days} dias con ${hours} horas`
    if (hours > 0) return `${hours} horas con ${minutes} minutos`
    if (minutes > 0) return `${minutes} minutos`

    return 'Menos de un minuto'
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
