import {Component, Input, OnInit} from '@angular/core';
import * as ApexCharts from 'apexcharts';
import {DashboardService} from '../services/dashboard.service';
import {AuthService} from '../../shared/services/auth.service';

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
  @Input() periodo = 'dia';
  datosDiarios: number[] = [];
  datosMes: number[] = [];
  datosAnio: number[] = [];

  diaOptions = {
    chart: {
      type: this.tipoChart,
      height: 450,
      width: '100%',
      stacked: true,
      foreColor: '#999',
      toolbar: {
        show: true,
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        }
      },
    },
    colors: ['#415ba2', '#04ccae', '#ccac04', '#4804cc', '#cc0424'],
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
          position: 'top',
        },
        columnWidth: '70%',
        endingShape: 'rounded',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: ["#fff"],
      },
      formatter: function (val: any, opts: any) {
        if (val == 0 || val == '0') {
          return " ";
        } else {
          return val;
        }
      }
    },
    series: [
      {
        name: 'ebiGO',
        data: this.datosMes,
      },
    ],
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23,
    ],
    xaxis: {
      type: 'category',
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
      toolbar: {
        show: true,
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        }
      },
    },
    colors: ['#415ba2', '#04ccae', '#ccac04', '#4804cc', '#cc0424'],
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
          position: 'top',
        },
        columnWidth: '70%',
        endingShape: 'rounded',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: ["#fff"],
      },
      formatter: function (val: any, opts: any) {
        if (val == 0 || val == '0') {
          return " ";
        } else {
          return val;
        }
      }
    },
    series: [
      {
        name: 'ebiGO',
        data: this.datosMes,
      },
    ],
    labels: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
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
      }
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
    }
  };
  anioOptions = {
    chart: {
      type: this.tipoChart,
      height: 450,
      width: '100%',
      stacked: true,
      foreColor: '#999',
      toolbar: {
        show: true,
        tools: {
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        }
      },
    },
    colors: ['#415ba2', '#04ccae', '#ccac04', '#4804cc', '#cc0424'],
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
          position: 'top',
        },
        columnWidth: '70%',
        endingShape: 'rounded',
        borderRadius: 4,
      },
      markers: {sieze: 5,},
    },
    dataLabels: {
      enabled: true,
      offsetY: 0,
      style: {
        fontSize: '12px',
        colors: ["#fff"],
      },
      formatter: function (val: any, opts: any) {
        if (val == 0 || val == '0') {
          return " ";
        } else {
          return val;
        }
      }
    },
    series: [
      {
        name: 'ebiGO',
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
    private auth: AuthService,
    private dashboardService: DashboardService,
  ) {

  }

  datosUsuarioLogeado = this.auth.getParking();

  ngOnChanges(): void {
    let fecha = this.fecha;
    let partesFecha = fecha.split('-');
    let mes = partesFecha[1];
    let anio = partesFecha[0];
    if (this.tipo === 'Ingresos') {
      if (this.periodo == 'dia') {
        this.getDatosDiarios(this.parking, fecha);
      }
      if (this.periodo == 'mes') {
        this.getDatosMes(this.parking, mes, anio);
      }
      if (this.periodo == 'anio') {
        this.getDatosAnio(this.parking, anio);
      }
    }
    if (this.tipo === 'Flujo') {
      if (this.periodo == 'dia') {
        this.getDatosFlujoDiarios(this.parking, fecha);
      }
      if (this.periodo == 'mes') {
        this.getDatosFlujoMes(this.parking, mes, anio);
      }
      if (this.periodo == 'anio') {
        this.getDatosFlujoAnio(this.parking, anio);
      }
    }
    if (this.tipo === 'Cortesias') {
      if (this.periodo == 'dia') {
        this.getDatosCortesiasDiarios(this.datosUsuarioLogeado.id, fecha);
      }
      if (this.periodo == 'mes') {
        this.getDatosCortesiasMes(this.datosUsuarioLogeado.id, mes, anio);
      }
      if (this.periodo == 'anio') {
        this.getDatosCortesiasAnio(this.datosUsuarioLogeado.id, anio);
      }
    }
    if (this.tipo === 'CortesiasEstacionarias') {
      if (this.periodo == 'dia') {
        this.getDatosCortesiasEstacionariasDiarios(this.datosUsuarioLogeado.id, fecha);
      }
      if (this.periodo == 'mes') {
        this.getDatosCortesiasEstacionariasMes(this.datosUsuarioLogeado.id, mes, anio);
      }
      if (this.periodo == 'anio') {
        this.getDatosCortesiasEstacionariasAnio(this.datosUsuarioLogeado.id, anio);
      }
    }
  }

  ngOnInit(): void {
    if (this.periodo == 'dia') {
      this.diaOptions.chart.type = this.tipoChart;
      this.chart = new ApexCharts(document.querySelector('.' + this.tipo + ' #' + this.periodo + ' #grafica'), this.diaOptions);
      this.chart.render();
    }
    if (this.periodo == 'mes') {
      this.mesOptions.chart.type = this.tipoChart;
      this.chart = new ApexCharts(document.querySelector('.' + this.tipo + ' #' + this.periodo + ' #grafica'), this.mesOptions);
      this.chart.render();
    }
    if (this.periodo == 'anio') {
      this.anioOptions.chart.type = this.tipoChart;
      this.chart = new ApexCharts(document.querySelector('.' + this.tipo + ' #' + this.periodo + ' #grafica'), this.anioOptions);
      this.chart.render();
    }
  }


//Entradas
  getDatosDiarios(parkingId: string, fecha: string) {
    return this.dashboardService.getDailyEntries(parkingId, fecha)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if (nombreSerie === 'Ticket_ebi') {
                nombreSerie = 'ebiGO Ticket';
              } else {
                nombreSerie = 'ebiGO ' + nombreSerie;
              }
              let datosDeServicio = data[key][key_item];
              let DatosDiariosServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
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
            title: {
              text: this.tipo + ' por día'
            }
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -10,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
              }
            });
          }

        }
      });
  }

  getDatosMes(parkingId: string, mes: string, anio: string) {
    return this.dashboardService.getMonthlyEntries(parkingId, mes, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if (nombreSerie === 'Ticket_ebi') {
                nombreSerie = 'ebiGO Ticket';
              } else {
                nombreSerie = 'ebiGO ' + nombreSerie;
              }
              let datosDeServicio = data[key][key_item];
              let DatosMesServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
                DatosMesServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosMesServicio
              })
            });
          });
          let labelsDatos: any[] = [];
          let diasDelMes = new Date(+anio, +mes, 0).getDate();
          for (var iDias = 1; iDias <= diasDelMes; iDias++) {
            labelsDatos.push(iDias);
          }
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title: {
              text: this.tipo + ' por mes'
            },
            labels: labelsDatos
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -10,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
              }
            });
          }
        }
      });
  }

  getDatosAnio(parkingId: string, anio: string) {
    return this.dashboardService.getYearEntries(parkingId, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if (nombreSerie === 'Ticket_ebi') {
                nombreSerie = 'ebiGO Ticket';
              } else {
                nombreSerie = 'ebiGO ' + nombreSerie;
              }
              let datosDeServicio = data[key][key_item];
              let DatosAnioServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
                DatosAnioServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosAnioServicio
              })
            });
          });
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title: {
              text: this.tipo + ' por año'
            }
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -10,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
              }
            });
          }
        }
      });
  }

  //Cortesias normales
  getDatosCortesiasDiarios(parkingId: string, fecha: string) {
    return this.dashboardService.getDailyCourtesies(parkingId, fecha)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item.replace(/_/g, " ");

              let datosDeServicio = data[key][key_item];
              let DatosDiariosServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
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
            title: {
              text: this.tipo + ' por día'
            }
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -10,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
              }
            });
          }

        }
      });
  }

  getDatosCortesiasMes(parkingId: string, mes: string, anio: string) {
    return this.dashboardService.getMonthlyCourtesies(parkingId, mes, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item.replace(/_/g, " ");

              let datosDeServicio = data[key][key_item];
              let DatosMesServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
                DatosMesServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosMesServicio
              })
            });
          });
          let labelsDatos: any[] = [];
          let diasDelMes = new Date(+anio, +mes, 0).getDate();
          for (var iDias = 1; iDias <= diasDelMes; iDias++) {
            labelsDatos.push(iDias);
          }
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title: {
              text: this.tipo + ' por mes'
            },
            labels: labelsDatos
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -10,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
              }
            });
          }
        }
      });
  }

  getDatosCortesiasAnio(parkingId: string, anio: string) {
    return this.dashboardService.getYearCourtesies(parkingId, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item.replace(/_/g, " ");

              let datosDeServicio = data[key][key_item];
              let DatosAnioServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
                DatosAnioServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosAnioServicio
              })
            });
          });
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title: {
              text: this.tipo + ' por año'
            }
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -10,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
              }
            });
          }
        }
      });
  }

  //Cortesias estacionarias
  getDatosCortesiasEstacionariasDiarios(parkingId: string, fecha: string) {
    return this.dashboardService.getDailyCourtesiesStation(parkingId, fecha)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item.replace(/_/g, " ");

              let datosDeServicio = data[key][key_item];
              let DatosDiariosServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
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
            title: {
              text: 'Corteías estacionarias por día'
            }
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -10,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
              }
            });
          }

        }
      });
  }

  getDatosCortesiasEstacionariasMes(parkingId: string, mes: string, anio: string) {
    return this.dashboardService.getMonthlyCourtesiesStation(parkingId, mes, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item.replace(/_/g, " ");

              let datosDeServicio = data[key][key_item];
              let DatosMesServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
                DatosMesServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosMesServicio
              })
            });
          });
          let labelsDatos: any[] = [];
          let diasDelMes = new Date(+anio, +mes, 0).getDate();
          for (var iDias = 1; iDias <= diasDelMes; iDias++) {
            labelsDatos.push(iDias);
          }
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title: {
              text: 'Cortesías estacionarias por mes'
            },
            labels: labelsDatos
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -10,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
              }
            });
          }
        }
      });
  }

  getDatosCortesiasEstacionariasAnio(parkingId: string, anio: string) {
    return this.dashboardService.getYearCourtesiesStation(parkingId, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item.replace(/_/g, " ");

              let datosDeServicio = data[key][key_item];
              let DatosAnioServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
                DatosAnioServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosAnioServicio
              })
            });
          });
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title: {
              text: 'Cortesías estacionarias por año'
            }
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -10,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
              }
            });
          }
        }
      });
  }

  //Flujo
  getDatosFlujoDiarios(parkingId: string, fecha: string) {
    return this.dashboardService.getDailyPayments(parkingId, fecha)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if (nombreSerie === 'Ticket_ebi') {
                nombreSerie = 'ebiGO Ticket';
              } else {
                nombreSerie = 'ebiGO ' + nombreSerie;
              }
              let datosDeServicio = data[key][key_item];
              let DatosDiariosServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
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
            title: {
              text: this.tipo + ' por día'
            }
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -5,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
                formatter: function (val: any, opts: any) {
                  if (val == 0 || val == '0') {
                    return " ";
                  } else {
                    return "Q " + val;
                  }
                }
              },
              tooltip: {
                shared: true,
                intersect: false,
                y: {
                  formatter: function (val: any, opts: any) {
                    return "Q " + val;
                  }
                }
              }
            });
          }
        }
      });
  }

  getDatosFlujoMes(parkingId: string, mes: string, anio: string) {
    return this.dashboardService.getMonthlyPayments(parkingId, mes, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if (nombreSerie === 'Ticket_ebi') {
                nombreSerie = 'ebiGO Ticket';
              } else {
                nombreSerie = 'ebiGO ' + nombreSerie;
              }
              let datosDeServicio = data[key][key_item];
              let DatosMesServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
                DatosMesServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosMesServicio
              })
            });
          });
          let labelsDatos: any[] = [];
          let diasDelMes = new Date(+anio, +mes, 0).getDate();
          for (var iDias = 1; iDias <= diasDelMes; iDias++) {
            labelsDatos.push(iDias);
          }
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title: {
              text: this.tipo + ' por mes'
            },
            labels: labelsDatos
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -1,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
                formatter: function (val: any, opts: any) {
                  if (val == 0 || val == '0') {
                    return " ";
                  } else {
                    return "Q " + val;
                  }
                }
              },
              tooltip: {
                shared: true,
                intersect: false,
                y: {
                  formatter: function (val: any, opts: any) {
                    return "Q " + val;
                  }
                }
              }
            });
          }
        }
      });
  }

  getDatosFlujoAnio(parkingId: string, anio: string) {
    return this.dashboardService.getYearPayments(parkingId, anio)
      .toPromise()
      .then((data) => {
        if (data) {
          let seriesDatos: any[] = [];
          Object.keys(data).forEach((key: any) => {
            Object.keys(data[key]).forEach((key_item: any) => {
              let nombreSerie = key_item;
              if (nombreSerie === 'Ticket_ebi') {
                nombreSerie = 'ebiGO Ticket';
              } else {
                nombreSerie = 'ebiGO ' + nombreSerie;
              }
              let datosDeServicio = data[key][key_item];
              let DatosAnioServicio: number[] = [];
              datosDeServicio.forEach((element: any) => {
                DatosAnioServicio.push(element.Cantidad);
              });
              seriesDatos.push({
                name: nombreSerie,
                data: DatosAnioServicio
              })
            });
          });
          this.chart.updateSeries(seriesDatos);
          this.chart.updateOptions({
            title: {
              text: this.tipo + ' por año'
            }
          });
          if (this.tipoChart == "line") {
            this.chart.updateOptions({
              chart: {
                stacked: false
              },
              dataLabels: {
                offsetY: -5,
                style: {
                  fontSize: '12px',
                  colors: ["#304758"],
                },
                formatter: function (val: any, opts: any) {
                  if (val == 0 || val == '0') {
                    return " ";
                  } else {
                    return "Q " + val;
                  }
                }
              },
              tooltip: {
                shared: true,
                intersect: false,
                y: {
                  formatter: function (val: any, opts: any) {
                    return "Q " + val;
                  }
                }
              }
            });
          }
        }
      });
  }
}
