import { Component, Input, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { ReportService } from '../../service/report.service';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
    selector: 'detail-grid',
    templateUrl: './detail-grid.component.html',
})
export class DetailGridComponent implements AfterViewInit{
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
        .getTicketsDateRpt(this.key,this.parqueo)
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
          saveAs(new Blob([buffer], {type: 'application/octet-stream'}), 'Detalle.xlsx');
        }).catch(error => {console.log(error)});
      }).catch(error => {console.log(error)});
      e.cancel = true;
    }

}