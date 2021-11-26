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
  holidayForm: FormGroup;
  rankForm: FormGroup;
  blockForm: FormGroup;
  defaultForm: FormGroup;

  hourAHalfForm: FormGroup;
  fixedCostForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private messageService: MessageService
  ) {
    this.holidayForm = this.createHolidayOrRankForm();
    this.rankForm = this.createHolidayOrRankForm();
    this.blockForm = this.createBlockForm();
    this.defaultForm = this.createDefaultForm();

    this.hourAHalfForm = this.createHourHalfForm();
    this.fixedCostForm = this.createFixedCostForm();
  }

  saveRule() {
    //const newRule = this.getTariffModel();
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

  createHolidayOrRankForm() {
    return this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      fromMinute: [null, Validators.required],
    });
  }

  createBlockForm() {
    return this.formBuilder.group({
      lowerLimit: [null, Validators.required],
      upperLimit: [null, Validators.required],
      fromMinute: [null, Validators.required],
    });
  }

  createDefaultForm() {
    return this.formBuilder.group({
      fromMinute: [null, Validators.required],
    });
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

  get optionsSelected() {
    return {
      timeRange: this.timeRange,
      costType: this.costType,
    };
  }

  gefOptions(time: number, cost: number) {
    return {
      timeRange: time,
      costType: cost,
    };
  }

  getTariffModel() {
    //Holiday and Hour and Half
    if (this.optionsSelected == this.gefOptions(1, 1)) {
      const input: HolidayHourHalfInputModel = {
        ...this.holidayFormValues,
        ...this.hourHalfFormValues,
      };
      return new HolidayHourHalfRuleModel(input);
    }
    //Holiday and Fixed Cost
    if (this.optionsSelected == this.gefOptions(1, 2)) {
      const input: HolidayFixedCostInputModel = {
        ...this.holidayFormValues,
        ...this.fixedCostFormValue,
      };
      return new HolidayHourFixedCostModel(input);
    }
    //Rank and Hour and Half Cost
    if (this.optionsSelected == this.gefOptions(2, 1)) {
      const input: RankHourHalfInputModel = {
        ...this.rankFormValues,
        ...this.hourHalfFormValues,
      };
      return new RankHourHalfRuleModel(input);
    }
    //Rank and Fixed Cost
    if (this.optionsSelected == this.gefOptions(2, 2)) {
      const input: RankFixedCostInputModel = {
        ...this.rankFormValues,
        ...this.fixedCostFormValue,
      };
      return new RankFixedCostRuleModel(input);
    }
    //Blocks and Hour and Half
    if (this.optionsSelected == this.gefOptions(3, 1)) {
      const input: BlockHourHalfInputModel = {
        ...this.blockFormValues,
        ...this.hourHalfFormValues,
      };
      return new BlockHourHalfRuleModel(input);
    }
    //Blocks and Fixed Cost
    if (this.optionsSelected == this.gefOptions(3, 2)) {
      const input: BlockFixedCostInputModel = {
        ...this.blockFormValues,
        ...this.fixedCostFormValue,
      };
      return new BlockFixedCostRuleModel(input);
    }
    //Default and Hour and Half Cost
    if (this.optionsSelected == this.gefOptions(4, 1)) {
      const input: DefaultHourHalfInputModel = {
        ...this.defaultFormValues,
        ...this.hourHalfFormValues,
      };
      return new DefaultHourHalfRuleModel(input);
    }
    //Default and Fixed Cost
    if (this.optionsSelected == this.gefOptions(4, 2)) {
      const input: DefaultFixedCostInputModel = {
        ...this.defaultFormValues,
        ...this.fixedCostFormValue,
      };
      return new DefaultFixedCostRuleModel(input);
    }

    this.messageService.error(
      '',
      'No pudo obtenerse la tarifa para ser guardada.'
    );
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

  emmitStep(number: number) {
    this.changeStep.emit(number);
  }
}
