import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AccessModel,
  CreateParkingStepFiveModel,
} from '../../models/CreateParking.model';
import { MessageService } from '../../../../shared/services/message.service';
import { ParkingService } from '../../services/parking.service';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import { ResponseModel } from '../../../../shared/model/Request.model';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-antennas',
  templateUrl: './antennas.component.html',
  styleUrls: ['./antennas.component.css'],
})
export class AntennasComponent {
  @Input() showButtons: boolean = false;
  stepFiveForm!: FormGroup;
  @Output() changeStep = new EventEmitter<number>();
  idEditAntenna: string = '';
  idParking =
    this.parkingService.parkingStepOne.parkingId ||
    this.authService.getParking().id;
  accessList: AccessModel[] = this.parkingService.getAccesses();
  antennas: CreateParkingStepFiveModel[] =
    new Array<CreateParkingStepFiveModel>();

  constructor(
    private formBuilder: FormBuilder,
    private message: MessageService,
    private parkingService: ParkingService,
    private utilitiesService: UtilitiesService,
    private authService: AuthService
  ) {
    this.message.showLoading();
    this.getInitialData().then(() => {
      this.message.hideLoading();
    });
    this.stepFiveForm = this.createForm();
  }

  getAccessName(type: number): AccessModel {
    let result = this.accessList.find((x) => x.value == type);

    return result === undefined ? new AccessModel() : result;
  }

  controlInvalid(control: string) {
    return this.utilitiesService.controlInvalid(this.stepFiveForm, control);
  }

  addAntenna() {
    this.message.showLoading();
    if (this.stepFiveForm.invalid) {
      this.message.warningTimeOut(
        'No ha llenado todos los datos. Para continuar por favor llene los datos necesarios.'
      );
      return;
    }
    if (this.idEditAntenna == '') {
      console.log(this.getStepFive());
      this.parkingService
        .setStepFive(this.getStepFive())
        .then((data: ResponseModel) => {
          console.log(data);
          if (data.success) {
            this.getInitialData().then(() => {
              this.message.OkTimeOut('Guardado');
              this.cleanForm();
            });
          } else {
            this.message.error(
              '',
              'No pudo guardarse la antena, error: ' + data.message
            );
          }
        });
    } else {
      let antennaToEdit: CreateParkingStepFiveModel = this.getStepFive();
      antennaToEdit.id = this.idEditAntenna;
      this.parkingService
        .editStepFive(antennaToEdit)
        .subscribe((data: ResponseModel) => {
          console.log(data);
          if (data.success) {
            this.cleanForm();
            this.getInitialData().then(() => {
              this.message.OkTimeOut('Guardado');
            });
          } else {
            this.message.error(
              '',
              'No pudo guardarse la antena, error: ' + data.message
            );
          }
          this.idEditAntenna = '';
        });
    }
  }

  emmitStep(number: number) {
    this.changeStep.emit(number);
  }

  validateId(id: string | undefined) {
    return id == undefined ? '' : id;
  }

  editAntenna(antenna: CreateParkingStepFiveModel) {
    antenna.id = this.validateId(antenna.id);
    this.idEditAntenna = antenna.id;
    this.stepFiveForm.controls['type_access'].setValue(antenna.type);
    this.stepFiveForm.controls['name_access'].setValue(antenna.name);
    this.stepFiveForm.controls['mac_access'].setValue(antenna.mac);
    this.stepFiveForm.controls['antenna_access'].setValue(antenna.antena);
    this.stepFiveForm.controls['isPrivate'].setValue(antenna.isPrivate);
  }

  deleteAntenna(antenna: CreateParkingStepFiveModel) {
    this.message.showLoading();
    antenna.id = this.validateId(antenna.id);
    this.parkingService.deleteAntenna(antenna.id).subscribe((data) => {
      if (data.success) {
        this.getInitialData().then(() => {
          this.message.OkTimeOut('Borrado');
        });
      }
    });
  }

  cleanForm() {
    this.idEditAntenna = '';
    this.stepFiveForm.controls['type_access'].setValue('');
    this.stepFiveForm.controls['name_access'].setValue('');
    this.stepFiveForm.controls['mac_access'].setValue('');
    this.stepFiveForm.controls['antenna_access'].setValue('');
    this.stepFiveForm.controls['isPrivate'].setValue('');
    this.utilitiesService.markAsUnTouched(this.stepFiveForm);
  }

  downloadQR(antenna: CreateParkingStepFiveModel) {
    this.message.showLoading();
    antenna.id = this.validateId(antenna.id);
    this.parkingService.getQR(antenna.id).subscribe(
      (data) => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(data);
        a.download = antenna.name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        this.message.hideLoading();
      },
      (err) => {
        this.message.error(
          '',
          'No pudo descargarse el QR. Por favor verifique si los datos existen.'
        );
      }
    );
  }

  private getStepFive(): CreateParkingStepFiveModel {
    return {
      parking: this.idParking,
      name: this.stepFiveForm.controls['name_access'].value,
      type: this.stepFiveForm.controls['type_access'].value,
      antena: this.stepFiveForm.controls['antenna_access'].value,
      mac: this.stepFiveForm.controls['mac_access'].value,
      isPrivate: this.stepFiveForm.controls['isPrivate'].value,
    };
  }

  private getInitialData() {
    return this.parkingService
      .getAntennas(this.idParking)
      .toPromise()
      .then((data: ResponseModel) => {
        if (data.success) {
          this.antennas = [];
          data.data.stations.forEach((station: CreateParkingStepFiveModel) => {
            this.antennas.push(station);
          });
        }
      })
      .catch((e) => {
        return;
      });
  }

  private createForm() {
    return this.formBuilder.group({
      type_access: [null],
      name_access: [null],
      mac_access: [null, Validators.required],
      antenna_access: [null],
      isPrivate: [false],
    });
  }
}
