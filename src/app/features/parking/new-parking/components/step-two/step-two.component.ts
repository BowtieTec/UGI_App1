import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from '../../../../../shared/services/message.service';
import { ParkingService } from '../../../services/parking.service';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';
import { CreateParkingStepTwoModel } from '../../../models/CreateParking.model';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.css'],
})
export class StepTwoComponent implements OnInit {
  @Input() stepTwoForm!: FormGroup;
  @Output() changeStep = new EventEmitter<number>();

  constructor(
    private message: MessageService,
    private parkingService: ParkingService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {}

  emmitStep(number: number) {
    if (number == 1) {
      if (this.stepTwoForm.valid) {
        this.parkingService.parkingStepTwo = this.getStepTwo();
        this.parkingService.parkingStepTwo.parkingId =
          this.parkingService.parkingStepOne.parkingId;
        this.parkingService.setStepTwo().subscribe((data) => {
          if (data.success) {
            this.changeStep.emit(number);
            this.message.OkTimeOut('Guardado');
          } else {
            this.utilitiesService.markAsTouched(this.stepTwoForm);
            this.message.error('', data.message);
          }
        });
      } else {
        this.message.errorTimeOut(
          '',
          'Datos faltantes o incorrectos. Validar que los datos sean correctos.'
        );
        this.utilitiesService.markAsTouched(this.stepTwoForm);
      }
    } else {
      this.changeStep.emit(number);
    }
  }

  private getStepTwo(): CreateParkingStepTwoModel {
    try {
      return {
        parkingId: this.parkingService.parkingStepOne.parkingId,
        schedules: [
          {
            isOpen: this.stepTwoForm.controls['isOpen0'].value,
            day: 0,
            openning_time: {
              hour: this.stepTwoForm.controls['openning_time0'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['openning_time0'].value.split(':')[1],
              second: '00',
            },
            closing_time: {
              hour: this.stepTwoForm.controls['closing_time0'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['closing_time0'].value.split(':')[1],
              second: '00',
            },
          },
          {
            isOpen: this.stepTwoForm.controls['isOpen1'].value,
            day: 1,
            openning_time: {
              hour: this.stepTwoForm.controls['openning_time1'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['openning_time1'].value.split(':')[1],
              second: '00',
            },
            closing_time: {
              hour: this.stepTwoForm.controls['closing_time1'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['closing_time1'].value.split(':')[1],
              second: '00',
            },
          },
          {
            isOpen: this.stepTwoForm.controls['isOpen2'].value,
            day: 2,
            openning_time: {
              hour: this.stepTwoForm.controls['openning_time2'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['openning_time2'].value.split(':')[1],
              second: '00',
            },
            closing_time: {
              hour: this.stepTwoForm.controls['closing_time2'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['closing_time2'].value.split(':')[1],
              second: '00',
            },
          },
          {
            isOpen: this.stepTwoForm.controls['isOpen3'].value,
            day: 3,
            openning_time: {
              hour: this.stepTwoForm.controls['openning_time3'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['openning_time3'].value.split(':')[1],
              second: '00',
            },
            closing_time: {
              hour: this.stepTwoForm.controls['closing_time3'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['closing_time3'].value.split(':')[1],
              second: '00',
            },
          },
          {
            isOpen: this.stepTwoForm.controls['isOpen4'].value,
            day: 4,
            openning_time: {
              hour: this.stepTwoForm.controls['openning_time4'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['openning_time4'].value.split(':')[1],
              second: '00',
            },
            closing_time: {
              hour: this.stepTwoForm.controls['closing_time4'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['closing_time4'].value.split(':')[1],
              second: '00',
            },
          },
          {
            isOpen: this.stepTwoForm.controls['isOpen5'].value,
            day: 5,
            openning_time: {
              hour: this.stepTwoForm.controls['openning_time5'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['openning_time5'].value.split(':')[1],
              second: '00',
            },
            closing_time: {
              hour: this.stepTwoForm.controls['closing_time5'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['closing_time5'].value.split(':')[1],
              second: '00',
            },
          },
          {
            isOpen: this.stepTwoForm.controls['isOpen6'].value,
            day: 6,
            openning_time: {
              hour: this.stepTwoForm.controls['openning_time6'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['openning_time6'].value.split(':')[1],
              second: '00',
            },
            closing_time: {
              hour: this.stepTwoForm.controls['closing_time6'].value.split(
                ':'
              )[0],
              minute:
                this.stepTwoForm.controls['closing_time6'].value.split(':')[1],
              second: '00',
            },
          },
        ],
      };
    } catch (e) {
      throw e;
    }
  }
}
