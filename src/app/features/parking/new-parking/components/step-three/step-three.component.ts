import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';
import { MessageService } from '../../../../../shared/services/message.service';
import {
  HolidayFixedCostInputModel,
  HolidayHourFixedCostModel,
  HolidayHourHalfInputModel,
  HolidayHourHalfRuleModel,
} from './model/HolidayTariff.model';
import {
  RankFixedCostInputModel,
  RankFixedCostRuleModel,
  RankHourHalfInputModel,
  RankHourHalfRuleModel,
} from './model/RankTariff.model';
import {
  BlockFixedCostInputModel,
  BlockFixedCostRuleModel,
  BlockHourHalfInputModel,
  BlockHourHalfRuleModel,
} from './model/BlockTariff.model';
import {
  DefaultFixedCostInputModel,
  DefaultFixedCostRuleModel,
  DefaultHourHalfInputModel,
  DefaultHourHalfRuleModel,
} from './model/DefaultTariff.model';
import { ParkingService } from '../../../services/parking.service';
import { CreateTariffModel } from '../../../models/Tariff.model';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
})
export class StepThreeComponent {
  @Input() stepOneForm!: FormGroup;
  @Output() changeStep = new EventEmitter<number>();
  timeRange: number = 1;
  costType: number = 1;
  disableRanges: boolean = false;
  generalDataForm: FormGroup;
  holidayForm: FormGroup;
  rankForm: FormGroup;
  blockForm: FormGroup;
  defaultForm: FormGroup;

  hourAHalfForm: FormGroup;
  fixedCostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private messageService: MessageService,
    private parkingService: ParkingService
  ) {
    this.generalDataForm = this.createGeneralDataForm();

    this.holidayForm = this.createHolidayOrRankForm();
    this.rankForm = this.createHolidayOrRankForm();
    this.blockForm = this.createBlockForm();
    this.defaultForm = this.createDefaultForm();

    this.hourAHalfForm = this.createHourHalfForm();
    this.fixedCostForm = this.createFixedCostForm();
  }

  saveRule() {
    this.messageService.showLoading();
    if (!this.formCostTypeSelected?.valid) {
      this.messageService.error(
        '',
        'Formulario de costos invalido. Porfavor verifique que los datos sean correctos. '
      );
      return;
    }
    const newRule: CreateTariffModel = {
      ...this.generalDataFormValues,
      rule: this.getTariffModel(),
      parking: this.parkingService.parkingStepOne.parkingId,
    };
    console.log(newRule);
    if (!newRule.rule) {
      this.messageService.error(
        '',
        'No pudo obtenerse la tarifa para ser guardada.'
      );
    } else {
      console.log(newRule);
      this.parkingService
        .setRule(newRule)
        .then((data) => {
          if (data.success) {
            this.messageService.OkTimeOut();
            console.log(data);
          } else {
            this.messageService.error('', data.message);
          }
          return data;
        })
        .catch((e) => {
          this.messageService.uncontrolledError(e.message);
        });
    }
  }

  validateGeneralDataForm(control: string) {
    return this.utilitiesService.controlInvalid(this.generalDataForm, control);
  }

  validateHolidayForm(control: string) {
    return this.utilitiesService.controlInvalid(this.holidayForm, control);
  }

  validateRankForm(control: string) {
    return this.utilitiesService.controlInvalid(this.rankForm, control);
  }

  validateBlockForm(control: string) {
    return this.utilitiesService.controlInvalid(this.blockForm, control);
  }

  validateDefaultForm(control: string) {
    return this.utilitiesService.controlInvalid(this.defaultForm, control);
  }

  validateHourHalfCost(control: string) {
    return this.utilitiesService.controlInvalid(this.hourAHalfForm, control);
  }

  validateFixedCost(control: string) {
    return this.utilitiesService.controlInvalid(this.fixedCostForm, control);
  }

  private createGeneralDataForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isShowDescription: [true],
    });
  }

  createHolidayOrRankForm() {
    return this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      fromMinute: [null, [Validators.required, Validators.min(0)]],
    });
  }

  createBlockForm() {
    return this.formBuilder.group({
      lowerLimit: [null, [Validators.required, Validators.min(0)]],
      upperLimit: [null, [Validators.required, Validators.min(0)]],
      fromMinute: [null, [Validators.required, Validators.min(0)]],
    });
  }

  createDefaultForm() {
    return this.formBuilder.group({
      fromMinute: [null, [Validators.required, Validators.min(0)]],
    });
  }

  get generalDataFormValues() {
    return {
      name: this.generalDataForm.get('name')!.value,
      description: this.generalDataForm.get('description')!.value,
      isShowDescription: this.generalDataForm.get('isShowDescription')!.value,
    };
  }

  get holidayFormValues() {
    return {
      fromDate: this.holidayForm.get('from')!.value,
      toDate: this.holidayForm.get('to')!.value,
      fromMinute: this.holidayForm.get('fromMinute')!.value,
    };
  }

  get rankFormValues() {
    return {
      fromTime: this.holidayForm.get('from')!.value,
      toTime: this.holidayForm.get('to')!.value,
      fromMinute: this.holidayForm.get('fromMinute')!.value,
    };
  }

  get blockFormValues() {
    return {
      lowerLimit: this.holidayForm.get('from')!.value,
      upperLimit: this.holidayForm.get('to')!.value,
      fromMinute: this.holidayForm.get('fromMinute')!.value,
    };
  }

  get defaultFormValues() {
    return {
      fromMinute: this.holidayForm.get('fromMinute')!.value,
    };
  }

  get hourHalfFormValues() {
    return {
      costHour: this.hourAHalfForm.get('hourCost')!.value,
      costAHalf: this.hourAHalfForm.get('halfCost')!.value,
    };
  }

  get fixedCostFormValue() {
    return {
      fixedCost: this.hourAHalfForm.get('halfCost')!.value,
    };
  }

  get isValidGeneralData() {
    return this.generalDataForm.valid;
  }

  validateSelected(time: number, cost: number) {
    return this.timeRange === time && this.costType === cost;
  }

  getTariffModel() {
    //Holiday and Hour and Half
    if (this.validateSelected(1, 1)) {
      const input: HolidayHourHalfInputModel = {
        ...this.holidayFormValues,
        ...this.hourHalfFormValues,
      };
      return new HolidayHourHalfRuleModel(input).rule;
    }
    //Holiday and Fixed Cost
    if (this.validateSelected(1, 2)) {
      const input: HolidayFixedCostInputModel = {
        ...this.holidayFormValues,
        ...this.fixedCostFormValue,
      };
      return new HolidayHourFixedCostModel(input).rule;
    }
    //Rank and Hour and Half Cost
    if (this.validateSelected(2, 1)) {
      const input: RankHourHalfInputModel = {
        ...this.rankFormValues,
        ...this.hourHalfFormValues,
      };
      return new RankHourHalfRuleModel(input).rule;
    }
    //Rank and Fixed Cost
    if (this.validateSelected(2, 2)) {
      const input: RankFixedCostInputModel = {
        ...this.rankFormValues,
        ...this.fixedCostFormValue,
      };
      return new RankFixedCostRuleModel(input).rule;
    }
    //Blocks and Hour and Half
    if (this.validateSelected(3, 1)) {
      const input: BlockHourHalfInputModel = {
        ...this.blockFormValues,
        ...this.hourHalfFormValues,
      };
      return new BlockHourHalfRuleModel(input).rule;
    }
    //Blocks and Fixed Cost
    if (this.validateSelected(3, 2)) {
      const input: BlockFixedCostInputModel = {
        ...this.blockFormValues,
        ...this.fixedCostFormValue,
      };
      return new BlockFixedCostRuleModel(input).rule;
    }
    //Default and Hour and Half Cost
    if (this.validateSelected(4, 1)) {
      const input: DefaultHourHalfInputModel = {
        ...this.defaultFormValues,
        ...this.hourHalfFormValues,
      };
      return new DefaultHourHalfRuleModel(input).rule;
    }
    //Default and Fixed Cost
    if (this.validateSelected(4, 2)) {
      const input: DefaultFixedCostInputModel = {
        ...this.defaultFormValues,
        ...this.fixedCostFormValue,
      };
      return new DefaultFixedCostRuleModel(input).rule;
    }

    return false;
  }

  private createHourHalfForm() {
    return this.formBuilder.group({
      hourCost: [null, Validators.required],
      halfCost: [null, Validators.required],
    });
  }

  private createFixedCostForm() {
    return this.formBuilder.group({
      fixedCost: [null, Validators.required],
    });
  }

  get formTimeRangeSelected() {
    switch (this.timeRange) {
      case 1:
        return this.holidayForm;
      case 2:
        return this.rankForm;
      case 3:
        return this.blockForm;
      case 4:
        return this.defaultForm;
      default:
        return null;
    }
  }

  get formCostTypeSelected() {
    switch (this.timeRange) {
      case 1:
        return this.hourAHalfForm;
      case 2:
        return this.fixedCostForm;
      default:
        return null;
    }
  }

  setDisableRanges() {
    const result = this.formTimeRangeSelected?.valid;
    if (!result) {
      this.messageService.error(
        '',
        'Formulario de rangos de tiempo inválido. Por favor validar que los datos sean correctos.'
      );
      return;
    }
    if (!this.isValidGeneralData) {
      this.messageService.error(
        '',
        'Formulario de datos generales inválido. Por favor validar que los datos sean correctos.'
      );
      return;
    }
    if (result) {
      this.disableRanges = !this.disableRanges;
    }
  }

  emmitStep(number: number) {
    this.messageService.showLoading();
    this.changeStep.emit(number);
    this.messageService.OkTimeOut();
  }
}
