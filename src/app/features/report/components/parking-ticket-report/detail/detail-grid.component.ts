import { Component, Input, AfterViewInit } from '@angular/core';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { ReportService } from '../../service/report.service';

@Component({
    selector: 'detail-grid',
    templateUrl: './detail-grid.component.html',
})
export class DetailGridComponent implements AfterViewInit{
    @Input() key!: string;

    tasksDataSource!: DataSource;

    task!: Task[];

    constructor(
        private reportService: ReportService
    ){
    }

    ngAfterViewInit(): void {
        this.reportService
        .getTicketsDateRpt(this.key)
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

}