import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  @Input() tipo = '';
  @Input() fecha = '';
  @Input() parking = '';
  @Input() tipoChart = 'bar';
  datosDiarios: number[] = [];
  datosMes: number[] = [];
  datosAnio: number[] = [];

  idDia: string = 'dia';

  diaOptions  = {
    chart: {
      type: this.tipoChart,
      height: 450,
      width: '100%',
      stacked: true,
      foreColor: '#999',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
          position: 'top',
        },
        columnWidth: '40%',
        endingShape: 'rounded',
        borderRadius: 2,
      },
    },
    dataLabels:{
      enabled: true,
      offsetY: -20,
      style:{
        fontSize: '12px',
        colors: ["#304758"],
      }
    },
    series: [
      {
        name: 'EBI Go',
        data: this.datosMes,
      },
    ],
    labels: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23,
    ],
    xaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      crosshairs: {
        show: true,
      },
      labels: {
        show: true,
        style: {
          fontSize: '14px',
        },
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      floating: false,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    title: {
      text: ' ',
      align: 'left',
    },
    subtitle: {
      text: '',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };
  mesOptions = {
    chart: {
      type: this.tipoChart,
      height: 450,
      width: '100%',
      stacked: true,
      foreColor: '#999',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
          position: 'top',
        },
        columnWidth: '40%',
        endingShape: 'rounded',
        borderRadius: 2,
      },
    },
    dataLabels:{
      enabled: true,
      offsetY: -20,
      style:{
        fontSize: '12px',
        colors: ["#304758"],
      }
    },
    series: [
      {
        name: 'EBI Go',
        data: this.datosMes,
      },
    ],
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30,
    ],
    xaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      crosshairs: {
        show: true,
      },
      labels: {
        show: true,
        style: {
          fontSize: '14px',
        },
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      floating: false,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    title: {
      text: ' ',
      align: 'left',
    },
    subtitle: {
      text: '',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };
  anioOptions = {
    chart: {
      type: this.tipoChart,
      height: 450,
      width: '100%',
      stacked: true,
      foreColor: '#999',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
          position: 'top',
        },
        columnWidth: '40%',
        endingShape: 'rounded',
        borderRadius: 4,
      },
    },
    dataLabels:{
      enabled: true,
      offsetY: -20,
      style:{
        fontSize: '12px',
        colors: ["#304758"],
      }
    },
    series: [
      {
        name: 'EBI Go',
        data: this.datosAnio,
      },
    ],
    labels: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic',
    ],
    xaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      crosshairs: {
        show: true,
      },
      labels: {
        show: true,
        style: {
          fontSize: '14px',
        },
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      floating: false,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    title: {
      text: ' ',
      align: 'left',
    },
    subtitle: {
      text: '',
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  chart: any;
  chart2: any;
  chart3: any;

  constructor(
    private dashboardService: DashboardService,
  ) {
    
  }

  ngOnChanges(): void{
    let fecha = this.fecha;
    let partesFecha = fecha.split('-');
    let mes = partesFecha[1];
    let anio = partesFecha[0];
    if(this.tipo === 'Ingresos'){
      this.getDatosDiarios(this.parking, fecha)
      .then(() => {
        return this.getDatosMes(this.parking, mes, anio);
      })
      .then(()=>{
        return this.getDatosAnio(this.parking,anio);
      });
    }
    if(this.tipo === 'Flujo'){
      this.getDatosFlujoDiarios(this.parking,fecha)
      .then(() => {
        return this.getDatosFlujoMes(this.parking,mes, anio);
      })
      .then(()=>{
        return this.getDatosFlujoAnio(this.parking,anio);
      });
    }
    if(this.tipo === 'Cortesias'){
      this.getDatosCortesiasDiarios(this.parking, fecha)
      .then(() => {
        return this.getDatosCortesiasMes(this.parking, mes, anio);
      })
      .then(()=>{
        return this.getDatosCortesiasAnio(this.parking,anio);
      });
    }
  }

  ngOnInit(): void {
    this.diaOptions.chart.type = this.tipoChart;
    this.mesOptions.chart.type = this.tipoChart;
    this.anioOptions.chart.type = this.tipoChart;
    this.chart = new ApexCharts(document.querySelector('.'+this.tipo+' #dia'), this.diaOptions);
    
    this.chart2 = new ApexCharts(
      document.querySelector('.'+this.tipo+' #mes'),
      this.mesOptions
    );
    this.chart3 = new ApexCharts(
      document.querySelector('.'+this.tipo+' #anio'),
      this.anioOptions
    );
    this.chart
      .render()
      .then(() => this.chart2.render())
      .then(() => this.chart3.render());
  }
//Entradas
  getDatosDiarios(parkingId: string, fecha: string){
    return this.dashboardService.getDailyEntries(parkingId, fecha)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if(nombreSerie === 'Ticket_ebi'){
                nombreSerie = 'EBI Go'
              }
              let datosDeServicio = data[key][key_item];
              let DatosDiariosServicio: number[] = [];
              datosDeServicio.forEach((element:any) => {
                DatosDiariosServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosDiariosServicio
              })
            });
          });
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title:{
              text: this.tipo+' por dia ('+fecha+')'
            }
          });

        } 
      });  
  }

  getDatosMes(parkingId: string, mes: string, anio: string){
    return this.dashboardService.getMonthlyEntries(parkingId, mes, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if(nombreSerie === 'Ticket_ebi'){
                nombreSerie = 'EBI Go'
              }
              let datosDeServicio = data[key][key_item];
              let DatosMesServicio: number[] = [];
              datosDeServicio.forEach((element:any) => {
                DatosMesServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosMesServicio
              })
            });
          });
          this.chart2.updateSeries(seriesDatos);
          this.chart2.updateOptions({
            title:{
              text: this.tipo+' por mes ('+anio+'-'+mes+')'
            }
          });
        } 
      });  
  }

  getDatosAnio(parkingId: string, anio: string){
    return this.dashboardService.getYearEntries(parkingId, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if(nombreSerie === 'Ticket_ebi'){
                nombreSerie = 'EBI Go'
              }
              let datosDeServicio = data[key][key_item];
              let DatosAnioServicio: number[] = [];
              datosDeServicio.forEach((element:any) => {
                DatosAnioServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosAnioServicio
              })
            });
          });
          this.chart3.updateSeries(seriesDatos);
          this.chart3.updateOptions({
            title:{
              text: this.tipo+' por año ('+anio+')'
            }
          });
        } 
      });  
  }
  //Cortesias
  getDatosCortesiasDiarios(parkingId: string, fecha: string){
    return this.dashboardService.getDailyCourtesies(parkingId, fecha)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if(nombreSerie === 'Ticket_ebi'){
                nombreSerie = 'EBI Go'
              }
              let datosDeServicio = data[key][key_item];
              let DatosDiariosServicio: number[] = [];
              datosDeServicio.forEach((element:any) => {
                DatosDiariosServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosDiariosServicio
              })
            });
          });
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title:{
              text: this.tipo+' por dia ('+fecha+')'
            }
          });

        } 
      });  
  }

  getDatosCortesiasMes(parkingId: string, mes: string, anio: string){
    return this.dashboardService.getMonthlyCourtesies(parkingId, mes, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if(nombreSerie === 'Ticket_ebi'){
                nombreSerie = 'EBI Go'
              }
              let datosDeServicio = data[key][key_item];
              let DatosMesServicio: number[] = [];
              datosDeServicio.forEach((element:any) => {
                DatosMesServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosMesServicio
              })
            });
          });
          this.chart2.updateSeries(seriesDatos);
          this.chart2.updateOptions({
            title:{
              text: this.tipo+' por mes ('+anio+'-'+mes+')'
            }
          });
        } 
      });  
  }

  getDatosCortesiasAnio(parkingId: string, anio: string){
    return this.dashboardService.getYearCourtesies(parkingId, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if(nombreSerie === 'Ticket_ebi'){
                nombreSerie = 'EBI Go'
              }
              let datosDeServicio = data[key][key_item];
              let DatosAnioServicio: number[] = [];
              datosDeServicio.forEach((element:any) => {
                DatosAnioServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosAnioServicio
              })
            });
          });
          this.chart3.updateSeries(seriesDatos);
          this.chart3.updateOptions({
            title:{
              text: this.tipo+' por año ('+anio+')'
            }
          });
        } 
      });  
  }
  //Flujo
  getDatosFlujoDiarios(parkingId: string, fecha: string){
    return this.dashboardService.getDailyPayments(parkingId,fecha)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if(nombreSerie === 'Ticket_ebi'){
                nombreSerie = 'EBI Go'
              }
              let datosDeServicio = data[key][key_item];
              let DatosDiariosServicio: number[] = [];
              datosDeServicio.forEach((element:any) => {
                DatosDiariosServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosDiariosServicio
              })
            });
          });
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title:{
              text: this.tipo+' por dia ('+fecha+')'
            }
          });

        } 
      });  
  }

  getDatosFlujoMes(parkingId: string, mes: string, anio: string){
    return this.dashboardService.getMonthlyPayments(parkingId,mes, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if(nombreSerie === 'Ticket_ebi'){
                nombreSerie = 'EBI Go'
              }
              let datosDeServicio = data[key][key_item];
              let DatosMesServicio: number[] = [];
              datosDeServicio.forEach((element:any) => {
                DatosMesServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosMesServicio
              })
            });
          });
          this.chart2.updateSeries(seriesDatos);
          this.chart2.updateOptions({
            title:{
              text: this.tipo+' por mes ('+anio+'-'+mes+')'
            }
          });
        } 
      });  
  }

  getDatosFlujoAnio(parkingId: string, anio: string){
    return this.dashboardService.getYearPayments(parkingId,anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if(nombreSerie === 'Ticket_ebi'){
                nombreSerie = 'EBI Go'
              }
              let datosDeServicio = data[key][key_item];
              let DatosAnioServicio: number[] = [];
              datosDeServicio.forEach((element:any) => {
                DatosAnioServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosAnioServicio
              })
            });
          });
          this.chart3.updateSeries(seriesDatos);
          this.chart3.updateOptions({
            title:{
              text: this.tipo+' por año ('+anio+')'
            }
          });
        } 
      });  
  }
}
