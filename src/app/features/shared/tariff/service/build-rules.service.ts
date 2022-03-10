import { Injectable } from '@angular/core'
import { HolidayInputModel } from '../model/HolidayTariff.model'
import {
  All,
  FixedCostInputModel,
  HourHalfInputModel,
  IEvent
} from '../model/Tariff.model'
import { BlockInputModel } from '../model/BlockTariff.model'
import { RankInputModel } from '../model/RankTariff.model'

@Injectable({
  providedIn: 'root'
})
export class BuildRulesService {
  static getHolidayIn(input: HolidayInputModel): All[] {
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

  public static getHolidayOut(input: HolidayInputModel): All[] {
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

  public static getBlock(input: BlockInputModel): All[] {
    return [
      {
        fact: 'hour',
        operator: 'greaterThanInclusive',
        value: input.hourLowerLimit
      },
      {
        fact: 'hour',
        operator: 'lessThanInclusive',
        value: input.hourUpperLimit
      },
      {
        fact: 'minutes',
        operator: 'greaterThanInclusive',
        value: input.minuteLowerLimit
      },
      {
        fact: 'minutes',
        operator: 'lessThanInclusive',
        value: input.minuteUpperLimit
      }
    ]
  }

  public static getRanksOut(input: RankInputModel): All[] {
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

  public static getRanksOrScheduleIn(input: RankInputModel): All[] {
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

  public static getRanksOrScheduleOut(input: RankInputModel): All[] {
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

  public static getDaysIn(days: number[]): All[] {
    return [
      {
        fact: 'date_in_object',
        operator: 'dayIn',
        value: days
      }
    ]
  }

  public static getDaysOut(days: number[]): All[] {
    return [
      {
        fact: 'date_out_object',
        operator: 'dayIn',
        value: days
      }
    ]
  }

  public static getGlobalSchedule(input: RankInputModel): All[] {
    console.log(input.fromTime.hours)
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
      },
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

  public static getHourOrHalfEvent(input: HourHalfInputModel): IEvent {
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

  public static getFixedPriceEvent(input: FixedCostInputModel): IEvent {
    return {
      type: 'costo fijo',
      params: {
        value: input.fixedCost,
        path: 1
      }
    }
  }
}
