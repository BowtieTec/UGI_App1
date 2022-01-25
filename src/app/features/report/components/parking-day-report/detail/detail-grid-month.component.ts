import { Component, Input, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { ReportService } from '../../service/report.service';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';

@Component({
    selector: 'detail-grid-month',
    templateUrl: './detail-grid-month.component.html',
})
export class DetailGridMonthComponent implements AfterViewInit{
    @Input() key!: string;
    @Input() parqueo: string = "0";

    tasksDataSource!: DataSource;

    task!: Task[];

    constructor(
        private reportService: ReportService
    ){
    }

    ngAfterViewInit(): void {
        this.reportService
        .getParkingDateRpt(this.key,this.parqueo)
         .toPromise()
         .then((data) => {
           if (data.success) {
             this.task = data.data;
           }
         }).then(() => {
           this.tasksDataSource = new DataSource({
            store: new ArrayStore({
                data: this.task,
                key: 'fecha',
            })
           });
         });

    }

    onExporting(e: any){
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Detalle');

      exportDataGrid({
        component: e.component,
        worksheet: worksheet,
        autoFilterEnabled: true,
      }).then(() => {
        workbook.xlsx.writeBuffer().then((buffer: any) => {
          saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'DetalleMensual.xlsx');
        })
      });
      e.cancel = true;
    }

}