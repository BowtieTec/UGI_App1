import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { UtilitiesService } from '../../../shared/services/utilities.service'
import { MessageService } from '../../../shared/services/message.service'
import {
  HolidayFixedCostInputModel,
  HolidayHourFixedCostModel,
  HolidayHourHalfInputModel,
  HolidayHourHalfRuleModel,
  HolidayInputModel
} from './model/HolidayTariff.model'
import {
  RankFixedCostInputModel,
  RankFixedCostRuleModel,
  RankHourHalfInputModel,
  RankHourHalfRuleModel,
  RankInputModel
} from './model/RankTariff.model'
import {
  BlockFixedCostInputModel,
  BlockFixedCostRuleModel,
  BlockHourHalfInputModel,
  BlockHourHalfRuleModel,
  BlockInputModel
} from './model/BlockTariff.model'
import {
  DefaultFixedCostInputModel,
  DefaultFixedCostRuleModel,
  DefaultHourHalfInputModel,
  DefaultHourHalfRuleModel,
  DefaultInputModel
} from './model/DefaultTariff.model'
import { ParkingService } from '../../parking/services/parking.service'
import { CurrencyPipe, DatePipe } from '@angular/common'
import { ValidationsService } from './service/validations.service'
import { AuthService } from '../../../shared/services/auth.service'
import { TariffFormsService } from './service/tariff-forms.service'

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css']
})
export class TariffComponent implements OnInit {
  @Input() parkingId!: string
  @Input() isCreatingParking!: boolean
  @Output() changeStep = new EventEmitter<number>()
  timeRange = 1
  costType = 1
  disableRanges = false
  tariffs: Array<any> = []

  generalDataForm: FormGroup = this.tariffForms.createGeneralDataForm()
  holidayForm: FormGroup = this.tariffForms.createHolidayOrRankForm()
  rankForm: FormGroup = this.tariffForms.createHolidayOrRankForm()
  blockForm: FormGroup = this.tariffForms.createBlockForm()
  defaultForm: FormGroup = this.tariffForms.createDefaultForm()
  prioriceForm: FormGroup = this.tariffForms.createPrioriceForm()
  daysSelectedForm: FormGroup = this.tariffForms.createDaysSelectedForm()
  principalScheduleForm: FormGroup =
    this.tariffForms.createPrincipalScheduleForm()

  hourAHalfForm: FormGroup = this.tariffForms.createHourHalfForm()
  fixedCostForm: FormGroup = this.tariffForms.createFixedCostForm()

  constructor(
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private messageService: MessageService,
    private parkingService: ParkingService,
    private date: DatePipe,
    private currencyPipe: CurrencyPipe,
    private authService: AuthService,
    private validationService: ValidationsService,
    private tariffForms: TariffFormsService
  ) {
    if (!this.parkingId && !this.isCreatingParking) {
      this.parkingId = this.authService.getParking().id
    }
    console.log(this.parkingId)
  }

  get generalDataFormValues() {
    return {
      name: this.generalDataForm.get('name')?.value,
      description: this.generalDataForm.get('description')?.value,
      isShowDescription: this.generalDataForm.get('isShowDescription')?.value
    }
  }

  get holidayFormValues(): HolidayInputModel {
    const fromDate = this.date.transform(
      this.holidayForm.get('from')?.value,
      'medium'
    )
    const toDate = this.date.transform(
      this.holidayForm.get('to')?.value,
      'medium'
    )
    return {
      static_descriptionTime: `Día festivo: Desde ${fromDate} Hasta el ${toDate}.`,
      fromDate: new Date(this.holidayForm.get('from')?.value),
      toDate: new Date(this.holidayForm.get('to')?.value)
    }
  }

  get rankFormValues(): RankInputModel {
    const fromTime = this.rankForm.get('from')!.value
    const toTime = this.rankForm.get('to')!.value
    return {
      static_descriptionTime: `Por Horarios o rangos: Desde las ${fromTime} Hasta las ${toTime}.`,
      fromTime,
      toTime
    }
  }

  get blockFormValues(): BlockInputModel {
    const hourLowerLimit = this.blockForm.get('hourLowerLimit')?.value
    const hourUpperLimit = this.blockForm.get('hourUpperLimit')?.value
    const minuteLowerLimit = this.blockForm.get('minuteLowerLimit')?.value
    const minuteUpperLimit = this.blockForm.get('minuteUpperLimit')?.value

    return {
      static_descriptionTime: `Por bloques: De ${hourLowerLimit} a ${hourUpperLimit} horas.`,
      hourLowerLimit,
      minuteLowerLimit,
      minuteUpperLimit,
      hourUpperLimit
    }
  }

  get defaultFormValues() {
    return {
      static_descriptionTime: `Tarifa por defecto.`
    }
  }

  get hourHalfFormValues() {
    const costHour = this.hourAHalfForm.get('hourCost')?.value
    const costAHalf = this.hourAHalfForm.get('halfCost')?.value
    return {
      static_descriptionCost: `Hora/Fracción: Costo por hora: ${this.currencyPipe.transform(
        costHour,
        'GTQ'
      )} Costo por fracción: ${this.currencyPipe.transform(costAHalf, 'GTQ')}`,
      costHour,
      costAHalf
    }
  }

  get globalScheduleFormValues() {
    const fromTime = this.principalScheduleForm.get('from')?.value
    const toTime = this.principalScheduleForm.get('to')?.value
    return {
      fromTime,
      toTime
    }
  }

  get fixedCostFormValue() {
    const fixedCost = this.fixedCostForm.get('fixedCost')!.value
    return {
      static_descriptionCost: `Único pago o Tarifa única: ${this.currencyPipe.transform(
        fixedCost,
        'GTQ'
      )}`,
      fixedCost
    }
  }

  get isValidGeneralData() {
    return this.generalDataForm.valid
  }

  get formTimeRangeSelected() {
    switch (this.timeRange) {
      case 1:
        return this.holidayForm
      case 2:
        return this.rankForm
      case 3:
        return this.blockForm
      case 4:
        return this.defaultForm
      default:
        return null
    }
  }

  get formValueTimeRangeSelected():
    | HolidayInputModel
    | RankInputModel
    | BlockInputModel
    | DefaultInputModel {
    switch (this.timeRange) {
      case 1:
        return this.holidayFormValues
      case 2:
        return this.rankFormValues
      case 3:
        return this.blockFormValues
      case 4:
        return this.defaultFormValues
      default:
        throw new Error(
          'No se pudo obtener los datos de los rangos de tiempo. Por favor intentar nuevamente.'
        )
    }
  }

  get formCostTypeSelected() {
    switch (this.costType) {
      case 1:
        return this.hourAHalfForm
      //TODO: Esta validacion no es funcional
      /* case 2:
         return this.fixedCostForm*/
      default:
        return null
    }
  }

  get ifHaveTariffData() {
    return this.tariffs && this.tariffs?.length > 0
  }

  ngOnInit(): void {
    if (!this.isCreatingParking) {
      this.parkingId = this.authService.getParking().id
      this.getTariffs()
    }
  }

  saveRule() {
    const ruleModelData = this.getTariffModel()
    console.log(ruleModelData)
    /* this.messageService.showLoading()
     if (!this.formCostTypeSelected?.valid) {
       this.messageService.error(
         '',
         'Formulario de costos invalido. Por favor verifique que los datos sean correctos. '
       )
       return
     }
     const newRule: CreateTariffModel = {
       ...this.generalDataFormValues,
       rules: ruleModelData.rule,
       parking: this.parkingId,
       static_description: ruleModelData.static_description
     }
     if (!newRule.rules) {
       this.messageService.error(
         '',
         'No pudo obtenerse la tarifa para ser guardada.'
       )
     } else {
       console.log(newRule)
       this.parkingService
         .setRule(newRule)
         .then((data) => {
           if (data.success) {
             this.messageService.OkTimeOut()
           } else {
             this.messageService.error('', data.message)
           }
           return data
         })
         .then(() => {
           this.getTariffs()
         })
         .catch((e) => {
           this.messageService.uncontrolledError(e.message)
         })
       this.messageService.OkTimeOut()
     }*/
  }

  validateSelected(time: number, cost: number) {
    return this.timeRange === time && this.costType === cost
  }

  validateRangesAgainstTheOthers() {
    switch (this.timeRange) {
      case 1:
        this.validationService.validateHolidayRange(
          this.holidayFormValues,
          this.tariffs
        )
        break
      case 2:
        this.validationService.validateRankAgainstTheOthers(
          this.rankFormValues,
          this.tariffs
        )
        break
    }
  }

  getTariffModel():
    | HolidayHourHalfRuleModel
    | HolidayHourFixedCostModel
    | RankHourHalfRuleModel
    | RankFixedCostRuleModel
    | BlockHourHalfRuleModel
    | BlockFixedCostRuleModel
    | DefaultHourHalfRuleModel
    | DefaultFixedCostRuleModel {
    //Holiday and Hour and Half
    try {
      this.getTariffs().catch()
      //this.validateRangesAgainstTheOthers()
      if (this.validateSelected(1, 1)) {
        const input: HolidayHourHalfInputModel = {
          ...this.holidayFormValues,
          ...this.hourHalfFormValues
        }
        return new HolidayHourHalfRuleModel(input)
      }
      //Holiday and Fixed Cost
      if (this.validateSelected(1, 2)) {
        const input: HolidayFixedCostInputModel = {
          ...this.holidayFormValues,
          ...this.fixedCostFormValue
        }
        return new HolidayHourFixedCostModel(input)
      }
      //Rank and Hour and Half Cost
      if (this.validateSelected(2, 1)) {
        const input: RankHourHalfInputModel = {
          ...this.rankFormValues,
          ...this.hourHalfFormValues
        }
        return new RankHourHalfRuleModel(input)
      }
      //Rank and Fixed Cost
      if (this.validateSelected(2, 2)) {
        const input: RankFixedCostInputModel = {
          ...this.rankFormValues,
          ...this.fixedCostFormValue
        }
        return new RankFixedCostRuleModel(input)
      }
      //Blocks and Hour and Half
      if (this.validateSelected(3, 1)) {
        const input: BlockHourHalfInputModel = {
          ...this.blockFormValues,
          ...this.hourHalfFormValues
        }
        return new BlockHourHalfRuleModel(input)
      }
      //Blocks and Fixed Cost
      if (this.validateSelected(3, 2)) {
        const input: BlockFixedCostInputModel = {
          ...this.blockFormValues,
          ...this.fixedCostFormValue
        }
        return new BlockFixedCostRuleModel(input)
      }
      //Default and Hour and Half Cost
      if (this.validateSelected(4, 1)) {
        const input: DefaultHourHalfInputModel = {
          ...this.defaultFormValues,
          ...this.hourHalfFormValues
        }
        return new DefaultHourHalfRuleModel(input)
      }
      //Default and Fixed Cost
      if (this.validateSelected(4, 2)) {
        const input: DefaultFixedCostInputModel = {
          ...this.defaultFormValues,
          ...this.fixedCostFormValue
        }
        return new DefaultFixedCostRuleModel(input)
      }
      throw new Error(
        'No se pudo obtener la información de las tarifas. Por favor intente nuevamente'
      )
    } catch (ex) {
      this.messageService.error(ex.message)
      throw new Error(ex)
    }
  }

  setDisableRanges() {
    const result = this.formTimeRangeSelected?.valid

    if (!result) {
      if (this.formTimeRangeSelected?.errors?.datesInvalid) {
        this.messageService.error(
          '',
          'La segunda fecha "Hasta" debe ser mayor a la fecha "Desde".'
        )
        return
      }
      if (this.formTimeRangeSelected?.errors?.quantitiesInvalid) {
        this.messageService.error(
          '',
          'El limite inferior es mayor al limite superior.'
        )
        return
      }
      this.messageService.error(
        '',
        'Formulario de rangos de tiempo inválido. Por favor validar que los datos sean correctos.'
      )
      return
    }
    if (!this.isValidGeneralData) {
      this.messageService.error(
        '',
        'Formulario de datos generales inválido. Por favor validar que los datos sean correctos.'
      )
      return
    }
    if (result) {
      this.costType = 1
      this.disableRanges = !this.disableRanges
    }
  }

  emmitStep(number: number) {
    this.messageService.showLoading()
    this.changeStep.emit(number)
    this.messageService.OkTimeOut()
  }

  deleteTariff(id: string) {
    this.messageService.showLoading()
    this.parkingService
      .deleteTariff(id)
      .then((data) => {
        if (!data.success) this.messageService.error('', data.message)

        return data
      })
      .then((data) => {
        if (data.success) {
          this.getTariffs()
          this.messageService.OkTimeOut()
        }
      })
  }

  private async getTariffs() {
    return this.parkingService.getTariffsSaved(this.parkingId).then((data) => {
      if (data.success) {
        this.tariffs = data.data.rules
      }
    })
  }

  changeTimeRange(timeRange: number) {
    this.timeRange = timeRange
  }
}
