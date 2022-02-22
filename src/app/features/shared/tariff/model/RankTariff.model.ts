import { Time } from '@angular/common'
import { RuleModel } from './Tariff.model'

export class RankInputModel {
  static_descriptionTime = ''
  fromTime!: Time
  toTime!: Time
  fromMinute = 0
}

export class RankHourHalfInputModel extends RankInputModel {
  static_descriptionCost = ''
  costHour = 0
  costAHalf = 0
}

export class RankFixedCostInputModel extends RankInputModel {
  static_descriptionCost = ''
  fixedCost = 0
}

export class RankHourHalfRuleModel {
  static_description: string =
    this.rankInput.static_descriptionTime +
    ' ' +
    this.rankInput.static_descriptionCost
  rule = [
    {
      conditions: {
        all: [
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.hours
          },
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.hours
          },
          {
            fact: 'hour',
            path: '$.hour',
            operator: 'greaterThanInclusive',
            value: 1
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.minutes
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.minutes
          }
        ]
      },
      event: {
        type: 'Tarifa Hora por horario',
        params: {
          value: this.rankInput.costHour,
          path: '$.hour'
        }
      }
    },
    {
      conditions: {
        all: [
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.hours
          },
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.hours
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.minutes
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.minutes
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromMinute
          }
        ]
      },
      event: {
        type: 'Tarifa Fraccion',
        params: {
          value: this.rankInput.costAHalf,
          path: 1
        }
      }
    }
  ]

  constructor(private rankInput: RankHourHalfInputModel) {}
}

export class RankFixedCostRuleModel {
  static_description: string =
    this.rankInput.static_descriptionTime +
    ' ' +
    this.rankInput.static_descriptionCost
  rule: Array<RuleModel> = [
    {
      conditions: {
        all: [
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.hours
          },
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.hours
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.minutes
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.minutes
          },
          {
            any: [
              {
                fact: 'date_out_object',
                path: '$.hour',
                operator: 'greaterThanInclusive',
                value: 1
              },
              {
                fact: 'date_out_object',
                path: '$.minute',
                operator: 'greaterThanInclusive',
                value: this.rankInput.fromMinute
              }
            ]
          }
        ]
      },
      event: {
        type: 'Tarifa Fraccion',
        params: {
          value: this.rankInput.fixedCost,
          path: 1
        }
      }
    }
  ]

  constructor(private rankInput: RankFixedCostInputModel) {}
}
