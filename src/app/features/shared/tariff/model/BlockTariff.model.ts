import { RuleModel } from './Tariff.model'

export class BlockInputModel {
  static_descriptionTime = ''
  lowerLimit = 0
  upperLimit = 0
  fromMinute = 0
}

export class BlockHourHalfInputModel extends BlockInputModel {
  static_descriptionCost = ''
  costHour = 0
  costAHalf = 0
}

export class BlockFixedCostInputModel extends BlockInputModel {
  static_descriptionCost = ''
  fixedCost = 0
}

export class BlockHourHalfRuleModel {
  static_description: string =
    this.blockInput.static_descriptionTime +
    ' ' +
    this.blockInput.static_descriptionCost
  rule: Array<RuleModel> = [
    {
      conditions: {
        all: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: this.blockInput.lowerLimit
          },
          {
            fact: 'hour',
            operator: 'LessThanInclusive',
            value: this.blockInput.upperLimit
          },
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: 1
          }
        ]
      },
      event: {
        type: 'Tarifa Hora por bloque',
        params: {
          value: this.blockInput.costHour,
          path: 'hour'
        }
      }
    },
    {
      conditions: {
        all: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: this.blockInput.lowerLimit
          },
          {
            fact: 'hour',
            operator: 'LessThanInclusive',
            value: this.blockInput.upperLimit
          },
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: this.blockInput.fromMinute
          },
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: 1
          }
        ]
      },
      event: {
        type: 'Tarifa Fraccion por bloque',
        params: {
          value: this.blockInput.costAHalf,
          path: 1
        }
      }
    }
  ]

  constructor(private blockInput: BlockHourHalfInputModel) {}
}

export class BlockFixedCostRuleModel {
  static_description: string =
    this.blockInput.static_descriptionTime +
    ' ' +
    this.blockInput.static_descriptionCost
  rule: Array<RuleModel> = [
    {
      conditions: {
        all: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: this.blockInput.lowerLimit
          },
          {
            fact: 'hour',
            operator: 'LessThanInclusive',
            value: this.blockInput.upperLimit
          },
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: 1
          },
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: this.blockInput.fromMinute
          }
        ]
      },
      event: {
        type: 'Tarifa Hora por bloque',
        params: {
          value: this.blockInput.fixedCost,
          path: 1
        }
      }
    }
  ]

  constructor(private blockInput: BlockFixedCostInputModel) {}
}
