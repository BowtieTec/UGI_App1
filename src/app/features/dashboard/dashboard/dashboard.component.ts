import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PermissionsService } from '../../../shared/services/permissions.service';
import { ResponseModel } from '../../../shared/model/Request.model';
import { ParkingService } from '../../parking/services/parking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParkingModel } from '../../parking/models/Parking.model';

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
  fechaIngresos = new Date().toISOString().split('T')[0];
  fechaFlujo = new Date().toISOString().split('T')[0];
  fechaCortesias = new Date().toISOString().split('T')[0];
  parqueoIngresos = '0';
  parqueoFlujo = '0';
  parqueoCortesias = '0';
  graficosIngresoVehiculos = environment.graficosIngresoVehiculos;
  graficosFlujoDinero = environment.graficosFlujoDinero;
  graficosCortesias = environment.graficosCortesias;
  allParking: ParkingModel[] = Array<ParkingModel>();
  @ViewChild('inputFechaIngreso') inputFechaIngreso!: ElementRef;
  @ViewChild('inputParkingIngreso') inputParkingIngreso!: ElementRef;
  @ViewChild('inputFechaFlujo') inputFechaFlujo!: ElementRef;
  @ViewChild('inputParkingFlujo') inputParkingFlujo!: ElementRef;
  @ViewChild('inputFechaCortesias') inputFechaCortesias!: ElementRef;
  @ViewChild('inputParkingCortesias') inputParkingCortesias!: ElementRef;
  idTabActiva = 'ingresos';
  tipoIngresos = 'bar';
  tipoFlujo = 'line';
  tipoCortesias = 'bar';


  constructor(
    private permissionService: PermissionsService,
    private parkingService: ParkingService,) {
      if(this.ifHaveAction('graficosIngresoVehiculos')){
        this.idTabActiva = 'ingresos';
      }else if(this.ifHaveAction('graficosFlujoDinero')){
        this.idTabActiva = 'flujo';
      }else if(this.ifHaveAction('graficosCortesias')){
        this.idTabActiva = 'cortesias';
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

  searchIngresos(){
    this.fechaIngresos = this.inputFechaIngreso.nativeElement.value;
    this.parqueoIngresos = this.inputParkingIngreso.nativeElement.value;
    return true;
  }

  searchFlujo(){
    this.fechaFlujo = this.inputFechaFlujo.nativeElement.value;
    //this.parqueoFlujo = this.inputParkingFlujo.nativeElement.value;
    return true;
  }

  searchCortesias(){
    this.fechaCortesias = this.inputFechaCortesias.nativeElement.value;
    this.parqueoCortesias = this.inputParkingCortesias.nativeElement.value;
    return true;
  }

  tabChanges(ids: string){
    this.idTabActiva = ids;
  }
}
