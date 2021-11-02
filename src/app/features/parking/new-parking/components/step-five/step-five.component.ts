import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AccessModel,
  CreateParkingStepFiveModel,
} from '../../../models/CreateParking.model';
import { MessageService } from '../../../../../shared/services/message.service';
import { ParkingService } from '../../../services/parking.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';

@Component({
  selector: 'app-step-five',
  templateUrl: './step-five.component.html',
  styleUrls: ['./step-five.component.css'],
})
export class StepFiveComponent implements OnInit {
  @Input() stepFiveForm!: FormGroup;
  @Output() changeStep = new EventEmitter<number>();
  accessList: AccessModel[] = this.parkingService.getAccesses();

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {}

  get antennas() {
    return this.stepFiveForm.get('antennas') as FormArray;
  }

  FormArrayInvalid(control: string, i: number) {
    return (
      this.antennas.controls[i].get(control)?.invalid &&
      this.antennas.controls[i].get(control)?.touched
    );
  }

  private getStepFive(): CreateParkingStepFiveModel[] {
    let antennas: CreateParkingStepFiveModel[] = [];
    this.antennas.value.forEach((antenna: any) =>
      antennas.push({
        parking: this.parkingService.parkingStepOne.parkingId,
        name: antenna.name_access,
        type: antenna.type_access,
        antena: antenna.antenna_access,
        mac: antenna.mac_access,
      })
    );
    return antennas;
  }

  addAntenna() {
    if (this.antennas.invalid) {
      this.message.warningTimeOut(
        'No ha llenado todos los datos. Para continuar porfavor llene los datos necesarios.'
      );
      this.utilitiesService.controlInvalidArray(this.antennas);
    } else {
      this.antennas.push(this.parkingService.createAccess());
    }
  }

  emmitStep(number: number) {
    if (number == 1) {
      if (this.stepFiveForm.valid) {
        this.parkingService.parkingStepFive = this.getStepFive();
        console.log('Paso 5');
        let promises = Array<Promise<any>>();
        this.parkingService.parkingStepFive.forEach(
          (antenna: CreateParkingStepFiveModel) => {
            //TODO: No Push a las antenas que ya han sido agregadas.
            promises.push(this.parkingService.setStepFive(antenna));
          }
        );
        Promise.all(promises).then(
          (data) => {
            let allIsRight = true;
            data.forEach((response, i) => {
              if (response.success) {
                this.antennas.controls[i].get('isWrong')?.setValue(false);
                this.antennas.controls[i].get('isRight')?.setValue(true);
              } else {
                //TODO: Verificar el funcionamiento
                allIsRight = false;
                this.antennas.controls[i].get('isWrong')?.setValue(true);
                this.antennas.controls[i].get('isRight')?.setValue(false);
              }
              this.antennas.controls[i]
                .get('message')
                ?.setValue(response.message);
            });
            if (allIsRight) {
              this.changeStep.emit(number);
            }
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.message.errorTimeOut(
          '',
          'Datos faltantes o incorrectos. Validar que los datos sean correctos.'
        );
        this.utilitiesService.controlInvalidArray(this.antennas);
      }
    } else {
      this.changeStep.emit(number);
    }
  }
}
