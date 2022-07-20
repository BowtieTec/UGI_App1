import {SelectModel} from "../../../shared/model/CommonModels";

export class DayTransitDashboardModel {
  fecha: string
  parking: string = ''
  periodo: string = 'dia'
  tipoChart: string = 'bar'
  tipo: string = 'Ingresos'

  constructor(fecha: Date, parking: string) {
    this.fecha = fecha.toString()
    this.parking = parking
  }
}


export class MonthTransitDashboardModel {
  fecha: string
  parking: string = ''
  periodo: string = 'mes'
  tipoChart: string = 'bar'
  tipo: string = 'Ingresos'

  constructor(fecha: Date, parking: string) {
    this.fecha = fecha.toISOString().split('T')[0]
    this.parking = parking
  }
}

export class YearTransitDashboardModel {
  fecha: string
  parking: string = ''
  periodo: string = 'anio'
  tipoChart: string = 'bar'
  tipo: string = 'Ingresos'

  constructor(fecha: Date, parking: string) {
    this.fecha = fecha.toISOString().split('T')[0]
    this.parking = parking
  }
}

export const allMonthsObject = (): SelectModel[] => {
  return [
    {id: '01', name: 'Enero'},
    {id: '02', name: 'Febrero'},
    {id: '03', name: 'Marzo'},
    {id: '04', name: 'Abril'},
    {id: '05', name: 'Mayo'},
    {id: '06', name: 'Junio'},
    {id: '07', name: 'Julio'},
    {id: '08', name: 'Agosto'},
    {id: '09', name: 'Septiembre'},
    {id: '10', name: 'Octubre'},
    {id: '11', name: 'Noviembre'},
    {id: '12', name: 'Diciembre'}
  ]
}
