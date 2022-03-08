export class BlockInputModel {
  static_descriptionTime = ''
  hourLowerLimit = 0
  minuteLowerLimit = 0
  hourUpperLimit = 0
  minuteUpperLimit = 0
}

/*

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
            value: this.blockInput.hourLowerLimit
          },
          {
            fact: 'hour',
            operator: 'LessThanInclusive',
            value: this.blockInput.hourUpperLimit
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
            value: this.blockInput.hourLowerLimit
          },
          {
            fact: 'hour',
            operator: 'LessThanInclusive',
            value: this.blockInput.hourUpperLimit
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
            value: this.blockInput.hourLowerLimit
          },
          {
            fact: 'hour',
            operator: 'LessThanInclusive',
            value: this.blockInput.hourUpperLimit
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
          value: this.blockInput.fixedCost,
          path: 1
        }
      }
    }
  ]

  constructor(private blockInput: BlockFixedCostInputModel) {}
}
*/
