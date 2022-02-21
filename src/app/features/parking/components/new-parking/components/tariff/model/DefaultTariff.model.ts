export class DefaultHourHalfInputModel {
  static_descriptionTime = ''
  static_descriptionCost = ''
  fromMinute = 0
  costHour = 0
  costAHalf = 0
}

export class DefaultFixedCostInputModel {
  static_descriptionTime = ''
  static_descriptionCost = ''
  fromMinute = 0
  fixedCost = 0
}

export class DefaultHourHalfRuleModel {
  static_description: string =
    this.defaultInput.static_descriptionTime +
    ' ' +
    this.defaultInput.static_descriptionCost
  rule = [
    {
      conditions: {
        all: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: 1
          }
        ]
      },
      event: {
        type: 'Tarifa Hora por default',
        params: {
          value: this.defaultInput.costHour,
          path: 'hour'
        }
      }
    },
    {
      conditions: {
        all: [
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: 1
          },
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: this.defaultInput.fromMinute
          }
        ]
      },
      event: {
        type: 'Tarifa Fraccion por bloque',
        params: {
          value: this.defaultInput.costAHalf,
          path: 1
        }
      }
    }
  ]

  constructor(private defaultInput: DefaultHourHalfInputModel) {}
}

export class DefaultFixedCostRuleModel {
  static_description: string =
    this.defaultInput.static_descriptionTime +
    ' ' +
    this.defaultInput.static_descriptionCost
  rule = [
    {
      conditions: {
        any: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: 1
          },
          {
            all: [
              {
                fact: 'minute',
                operator: 'greaterThanInclusive',
                value: 1
              },
              {
                fact: 'minute',
                operator: 'greaterThanInclusive',
                value: this.defaultInput.fromMinute
              }
            ]
          }
        ]
      },
      event: {
        type: 'Tarifa Hora por default',
        params: {
          value: this.defaultInput.fixedCost,
          path: 1
        }
      }
    }
  ]

  constructor(private defaultInput: DefaultFixedCostInputModel) {}
}
