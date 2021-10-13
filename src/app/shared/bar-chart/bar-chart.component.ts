import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  diaOptions = {
    chart: {
      type: 'bar',
      height: 450,
      width: '100%',
      stacked: true,
      foreColor: '#999',
      animations: {
        enabled: true,
        easing: 'easein',
        speed: 180,
      },
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
          position: 'bottom',
        },
        columnWidth: '40%',
        endingShape: 'rounded',
        borderRadius: 2,
        distributed: true,
      },
    },
    colors: ['#867df9', '#5147d6', '#1400a4'],
    series: [
      {
        name: 'Bowtie',
        data: [
          11, 15, 19, 22, 15, 5, 14, 16, 22, 29, 23, 20, 16, 24, 28, 26, 11, 24,
          19, 15, 10, 29, 23, 20,
        ],
      },
      {
        name: 'Ticket',
        data: [
          19, 15, 10, 11, 15, 28, 26, 22, 15, 5, 14, 16, 22, 29, 19, 20, 16, 24,
          19, 15, 10, 11, 15, 1,
        ],
      },
      {
        name: 'Parqueo mes',
        data: [
          20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15,
          19, 23, 16, 22, 22, 29,
        ],
      },
    ],
    labels: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23,
    ],
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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
      text: 'Parqueos por día',
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
      type: 'bar',
      height: 450,
      width: '100%',
      stacked: true,
      foreColor: '#999',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
        },
        columnWidth: '40%',
        endingShape: 'rounded',
        borderRadius: 2,
      },
    },
    colors: ['#867df9', '#5147d6', '#1400a4'],
    series: [
      {
        name: 'Bowtie',
        data: [
          24, 19, 15, 10, 11, 15, 19, 22, 15, 5, 14, 16, 22, 29, 23, 20, 16, 24,
          28, 26, 11, 15, 19, 22, 15, 5, 14, 16, 22, 29,
        ],
      },
      {
        name: 'Tickets',
        data: [
          19, 15, 10, 11, 15, 28, 26, 22, 15, 5, 14, 16, 22, 29, 19, 20, 16, 24,
          19, 15, 10, 11, 15, 28, 26, 24, 23, 19, 20, 2,
        ],
      },
      {
        name: 'Parqueo mes',
        data: [
          20, 16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10, 11, 15,
          19, 23, 16, 22, 29, 24, 19, 15, 24, 19, 15, 10,
        ],
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
      text: 'Parqueos por mes',
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
      type: 'bar',
      height: 450,
      width: '100%',
      stacked: true,
      foreColor: '#999',
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false,
        },
        columnWidth: '40%',
        endingShape: 'rounded',
        borderRadius: 4,
      },
    },
    colors: ['#867df9', '#5147d6', '#1400a4'],
    series: [
      {
        name: 'Bowtie',
        data: [16, 24, 28, 26, 22, 15, 5, 14, 16, 22, 29, 24],
      },
      {
        name: 'Tickets',
        data: [26, 22, 15, 5, 14, 16, 22, 29, 24, 19, 15, 10],
      },
      {
        name: 'Parqueo mes',
        data: [22, 29, 24, 19, 15, 10, 11, 15, 19, 23, 2, 11],
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
      text: 'Parqueos por año',
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

  constructor() {}

  ngOnInit(): void {
    let chart = new ApexCharts(document.querySelector('#dia'), this.diaOptions);
    let chart2 = new ApexCharts(
      document.querySelector('#mes'),
      this.mesOptions
    );
    let chart3 = new ApexCharts(
      document.querySelector('#anio'),
      this.anioOptions
    );
    chart
      .render()
      .then(() => chart2.render())
      .then(() => chart3.render());
  }
}
