import { Injectable } from '@angular/core'
import { HolidayInputModel } from '../model/HolidayTariff.model'
import {
  FixedCostInputModel,
  HourHalfInputModel,
  ICondition,
  IEvent
} from '../model/Tariff.model'
import { BlockInputModel } from '../model/BlockTariff.model'
import { RankInputModel } from '../model/RankTariff.model'

@Injectable({
  providedIn: 'root'
})
export class BuildRulesService {
  static getHolidayIn(input: HolidayInputModel): ICondition[] {
    return [
      {
        fact: 'date_in',
        operator: 'dateIsGreaterThan',
        value: input.toDate
      },
      {
        fact: 'date_in',
        operator: 'dateIsLessThan',
        value: input.fromDate
      }
    ]
  }

  static getHolidayOut(input: HolidayInputModel): ICondition[] {
    return [
      {
        fact: 'date_out',
        operator: 'dateIsGreaterThan',
        value: input.fromDate
      },
      {
        fact: 'date_out',
        operator: 'dateIsLessThan',
        value: input.toDate
      }
    ]
  }

  static getBlock(input: BlockInputModel): ICondition[] {
    return [
      {
        fact: 'hour',
        operator: 'greaterThanInclusive',
        value: input.hourLowerLimit
      },
      {
        fact: 'hour',
        operator: 'LessThanInclusive',
        value: input.hourUpperLimit
      },
      {
        fact: 'minutes',
        operator: 'greaterThanInclusive',
        value: input.minuteLowerLimit
      },
      {
        fact: 'minutes',
        operator: 'LessThanInclusive',
        value: input.minuteUpperLimit
      }
    ]
  }

  static getRanksOut(input: RankInputModel): ICondition[] {
    return [
      {
        fact: 'date_out_object',
        path: '$.hour',
        operator: 'greaterThanInclusive',
        value: input.fromTime.hours
      },
      {
        fact: 'date_out_object',
        path: '$.hour',
        operator: 'lessThanInclusive',
        value: input.toTime.hours
      },
      {
        fact: 'date_out_object',
        path: '$.minute',
        operator: 'greaterThanInclusive',
        value: input.fromTime.minutes
      },
      {
        fact: 'date_out_object',
        path: '$.minute',
        operator: 'lessThanInclusive',
        value: input.toTime.minutes
      }
    ]
  }

  static getRanksOrScheduleIn(input: RankInputModel): ICondition[] {
    return [
      {
        fact: 'date_in_object',
        path: '$.hour',
        operator: 'greaterThanInclusive',
        value: input.fromTime.hours
      },
      {
        fact: 'date_in_object',
        path: '$.hour',
        operator: 'lessThanInclusive',
        value: input.toTime.hours
      },
      {
        fact: 'date_in_object',
        path: '$.minute',
        operator: 'greaterThanInclusive',
        value: input.fromTime.minutes
      },
      {
        fact: 'date_in_object',
        path: '$.minute',
        operator: 'lessThanInclusive',
        value: input.toTime.minutes
      }
    ]
  }

  static getRanksOrScheduleOut(input: RankInputModel): ICondition[] {
    return [
      {
        fact: 'date_out_object',
        path: '$.hour',
        operator: 'greaterThanInclusive',
        value: input.fromTime.hours
      },
      {
        fact: 'date_out_object',
        path: '$.hour',
        operator: 'lessThanInclusive',
        value: input.toTime.hours
      },
      {
        fact: 'date_out_object',
        path: '$.minute',
        operator: 'greaterThanInclusive',
        value: input.fromTime.minutes
      },
      {
        fact: 'date_out_object',
        path: '$.minute',
        operator: 'lessThanInclusive',
        value: input.toTime.minutes
      }
    ]
  }

  static getDaysIn(days: []): ICondition[] {
    return [
      {
        fact: 'date_in_object',
        operator: 'dayIn',
        value: days
      }
    ]
  }

  static getDaysOut(days: []): ICondition[] {
    return [
      {
        fact: 'date_out_object',
        operator: 'dayIn',
        value: days
      }
    ]
  }

  static getGlobalSchedule(input: RankInputModel): ICondition[] {
    return [
      {
        fact: 'date_in_object',
        path: '$.hour',
        operator: 'greaterThanInclusive',
        value: input.fromTime.hours
      },
      {
        fact: 'date_in_object',
        path: '$.hour',
        operator: 'lessThanInclusive',
        value: input.toTime.hours
      },
      {
        fact: 'date_in_object',
        path: '$.minute',
        operator: 'greaterThanInclusive',
        value: input.fromTime.minutes
      },
      {
        fact: 'date_in_object',
        path: '$.minute',
        operator: 'lessThanInclusive',
        value: input.toTime.minutes
      }
    ]
  }

  static getHourOrHalfEvent(input: HourHalfInputModel): IEvent {
    return {
      type: 'Tarifa por hora y fraccion',
      params: [
        {
          type: 'Fraccion',
          params: {
            value: input.costAHalf,
            path: 1
          }
        },
        {
          type: 'Hora',
          params: {
            value: input.costHour,
            path: 'hour'
          }
        }
      ]
    }
  }

  static getFixedPriceEvent(input: FixedCostInputModel): IEvent {
    return {
      type: 'costo fijo',
      params: {
        value: input.fixedCost,
        path: 1
      }
    }
  }
}
