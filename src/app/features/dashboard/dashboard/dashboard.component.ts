import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { ParkingService } from '../../parking/services/parking.service';
import { FormGroup } from '@angular/forms';
import { ParkingModel } from '../../parking/models/Parking.model';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  searchIngresosForm!: FormGroup;
  ingresos = "Ingresos"
  flujo = 'Flujo';
  cortesias = 'Cortesias';
  graficosIngresoVehiculos = environment.graficosIngresoVehiculos;
  graficosFlujoDinero = environment.graficosFlujoDinero;
  graficosCortesias = environment.graficosCortesias;
  verTodosLosParqueosDashboard = environment.verTodosLosParqueosDashboard;
  allParking: ParkingModel[] = Array<ParkingModel>();

  //Parametros componente gráfica
  //Por día
  periodoDia = 'dia';
  fechaIngresosDia = new Date().toISOString().split('T')[0];
  fechaFlujoDia = new Date().toISOString().split('T')[0];
  fechaCortesiasDia = new Date().toISOString().split('T')[0];
  parqueoIngresosDia = '0';
  parqueoFlujoDia = '0';
  parqueoCortesiasDia = '0';

  @ViewChild('inputParkingIngresoDia') inputParkingIngresoDia!: ElementRef;
  @ViewChild('inputParkingFlujoDia') inputParkingFlujoDia!: ElementRef;
  @ViewChild('inputParkingCortesiasDia') inputParkingCortesiasDia!: ElementRef;

  @ViewChild('inputFechaIngresoDia') inputFechaIngresoDia!: ElementRef;
  @ViewChild('inputFechaFlujoDia') inputFechaFlujoDia!: ElementRef;
  @ViewChild('inputFechaCortesiasDia') inputFechaCortesiasDia!: ElementRef;

  //Por mes
  periodoMes = 'mes';
  fechaIngresosMes = new Date().toISOString().split('T')[0];
  fechaFlujoMes = new Date().toISOString().split('T')[0];
  fechaCortesiasMes = new Date().toISOString().split('T')[0];
  parqueoIngresosMes = '0';
  parqueoFlujoMes = '0';
  parqueoCortesiasMes = '0';

  @ViewChild('inputParkingIngresoMes') inputParkingIngresoMes!: ElementRef;
  @ViewChild('inputParkingFlujoMes') inputParkingFlujoMes!: ElementRef;
  @ViewChild('inputParkingCortesiasMes') inputParkingCortesiasMes!: ElementRef;

  @ViewChild('inputIngresoMesAnio') inputIngresoMesAnio!: ElementRef;
  @ViewChild('inputIngresoMes') inputIngresoMes!: ElementRef;
  @ViewChild('inputFlujoMesAnio') inputFlujoMesAnio!: ElementRef;
  @ViewChild('inputFlujoMes') inputFlujoMes!: ElementRef;
  @ViewChild('inputCortesiasMesAnio') inputCortesiasMesAnio!: ElementRef;
  @ViewChild('inputCortesiasMes') inputCortesiasMes!: ElementRef;

  //Por año
  periodoAnio = 'anio';
  fechaIngresosAnio = new Date().toISOString().split('T')[0];
  fechaFlujoAnio = new Date().toISOString().split('T')[0];
  fechaCortesiasAnio = new Date().toISOString().split('T')[0];
  parqueoIngresosAnio = '0';
  parqueoFlujoAnio = '0';
  parqueoCortesiasAnio = '0';

  @ViewChild('inputParkingIngresoAnio') inputParkingIngresoAnio!: ElementRef;
  @ViewChild('inputParkingFlujoAnio') inputParkingFlujoAnio!: ElementRef;
  @ViewChild('inputParkingCortesiasAnio') inputParkingCortesiasAnio!: ElementRef;

  @ViewChild('inputIngresoAnio') inputIngresoAnio!: ElementRef;
  @ViewChild('inputFlujoAnio') inputFlujoAnio!: ElementRef;
  @ViewChild('inputCortesiasAnio') inputCortesiasAnio!: ElementRef;

  MesActual = new Date().toISOString().split('T')[0].split('-')[1];
  AnioActual: any = +new Date().toISOString().split('T')[0].split('-')[0];

  Meses = [
    {"key":"01", "valor":"Enero"},
    {"key":"02", "valor":"Febrero"},
    {"key":"03", "valor":"Marzo"},
    {"key":"04", "valor":"Abril"},
    {"key":"05", "valor":"Mayo"},
    {"key":"06", "valor":"Junio"},
    {"key":"07", "valor":"Julio"},
    {"key":"08", "valor":"Agosto"},
    {"key":"09", "valor":"Septiembre"},
    {"key":"10", "valor":"Octubre"},
    {"key":"11", "valor":"Noviembre"},
    {"key":"12", "valor":"Diciembre"}
  ]
  AniosSelect: any[]=[];

  idTabActiva = 'ingresos';
  tipoIngresos = 'bar';
  tipoFlujo = 'line';
  tipoCortesias = 'bar';

  datosUsuarioLogeado = this.auth.getParking();

  constructor(
    private auth: AuthService,
    private permissionService: PermissionsService,
    private parkingService: ParkingService,) {
      if(this.ifHaveAction('graficosIngresoVehiculos')){
        this.idTabActiva = 'ingresos';
      }else if(this.ifHaveAction('graficosFlujoDinero')){
        this.idTabActiva = 'flujo';
      }else if(this.ifHaveAction('graficosCortesias')){
        this.idTabActiva = 'cortesias';
      }
      for(let iAnio = this.AnioActual-2; iAnio < this.AnioActual+6; iAnio++){
        this.AniosSelect.push({
          "key":iAnio, "valor":iAnio
        });
      }
  }

  ngOnInit(): void {
    this.parkingService.getAllParking().then((data) => {
      if (data.success) {
        this.allParking = data.data.parkings;
      }
    });
  }
  ifHaveAction(action: string) {
    return this.permissionService.ifHaveAction(action);
  }

  searchDia(tipo: any){
    if(tipo == this.ingresos){
      this.fechaIngresosDia = this.inputFechaIngresoDia.nativeElement.value;
      if(this.ifHaveAction('verTodosLosParqueosDashboard')){
        this.parqueoIngresosDia = this.inputParkingIngresoDia.nativeElement.value;
      }else{
        this.parqueoIngresosDia = this.datosUsuarioLogeado.id;
      }
    }
    if(tipo == this.flujo){
      this.fechaFlujoDia = this.inputFechaFlujoDia.nativeElement.value;
      if(this.ifHaveAction('verTodosLosParqueosDashboard')){
        this.parqueoFlujoDia = this.inputParkingFlujoDia.nativeElement.value;;
      }else{
        this.parqueoFlujoDia = this.datosUsuarioLogeado.id;
      }
    }
    if(tipo == this.cortesias){
      this.fechaCortesiasDia = this.inputFechaCortesiasDia.nativeElement.value;;
      if(this.ifHaveAction('verTodosLosParqueosDashboard')){
        this.parqueoCortesiasDia = this.inputParkingCortesiasDia.nativeElement.value;;
      }else{
        this.parqueoCortesiasDia = this.datosUsuarioLogeado.id;
      }
    }
    return true;
  }

  searchMes(tipo: any){
    if(tipo == this.ingresos){
      let anio = this.inputIngresoMesAnio.nativeElement.value;
      let mes = this.inputIngresoMes.nativeElement.value;
      let fecha = new Date(anio,mes-1,1).toISOString().split('T')[0];
      this.fechaIngresosMes = fecha;
      if(this.ifHaveAction('verTodosLosParqueosDashboard')){
        this.parqueoIngresosMes = this.inputParkingIngresoMes.nativeElement.value;
      }else{
        this.parqueoIngresosMes = this.datosUsuarioLogeado.id;
      }
    }
    if(tipo == this.flujo){
      let anio = this.inputFlujoMesAnio.nativeElement.value;
      let mes = this.inputFlujoMes.nativeElement.value;
      let fecha = new Date(anio,mes-1,1).toISOString().split('T')[0];
      this.fechaFlujoMes = fecha;
      if(this.ifHaveAction('verTodosLosParqueosDashboard')){
        this.parqueoFlujoMes = this.inputParkingFlujoMes.nativeElement.value;;
      }else{
        this.parqueoFlujoMes = this.datosUsuarioLogeado.id;
      }
    }
    if(tipo == this.cortesias){
      let anio = this.inputCortesiasMesAnio.nativeElement.value;
      let mes = this.inputCortesiasMes.nativeElement.value;
      let fecha = new Date(anio,mes-1,1).toISOString().split('T')[0];
      this.fechaCortesiasMes = fecha;
      if(this.ifHaveAction('verTodosLosParqueosDashboard')){
        this.parqueoCortesiasMes = this.inputParkingCortesiasMes.nativeElement.value;;
      }else{
        this.parqueoCortesiasMes = this.datosUsuarioLogeado.id;
      }
    }
    return true;
  }

  searchAnio(tipo: any){
    if(tipo == this.ingresos){
      let anio = this.inputIngresoAnio.nativeElement.value;
      let fecha = new Date(anio,0,1).toISOString().split('T')[0];
      this.fechaIngresosAnio = fecha;
      if(this.ifHaveAction('verTodosLosParqueosDashboard')){
        this.parqueoIngresosAnio = this.inputParkingIngresoAnio.nativeElement.value;;
      }else{
        this.parqueoIngresosAnio = this.datosUsuarioLogeado.id;
      }
    }
    if(tipo == this.flujo){
      let anio = this.inputFlujoAnio.nativeElement.value;
      let fecha = new Date(anio,0,1).toISOString().split('T')[0];
      this.fechaFlujoAnio = fecha;
      if(this.ifHaveAction('verTodosLosParqueosDashboard')){
        this.parqueoFlujoAnio = this.inputParkingFlujoAnio.nativeElement.value;;
      }else{
        this.parqueoFlujoAnio = this.datosUsuarioLogeado.id;
      }
    }
    if(tipo == this.cortesias){
      let anio = this.inputCortesiasAnio.nativeElement.value;
      let fecha = new Date(anio,0,1).toISOString().split('T')[0];
      this.fechaCortesiasAnio = fecha;
      if(this.ifHaveAction('verTodosLosParqueosDashboard')){
        this.parqueoCortesiasAnio = this.inputParkingCortesiasAnio.nativeElement.value;;
      }else{
        this.parqueoCortesiasAnio = this.datosUsuarioLogeado.id;
      }
    }
    return true;
  }

  tabChanges(ids: string){
    this.idTabActiva = ids;
  }
}
