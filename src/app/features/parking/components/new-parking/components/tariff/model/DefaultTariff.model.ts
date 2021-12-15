export class DefaultHourHalfInputModel {
  fromMinute: number = 0;
  costHour: number = 0;
  costAHalf: number = 0;
}

export class DefaultFixedCostInputModel {
  fromMinute: number = 0;
  fixedCost: number = 0;
}

export class DefaultHourHalfRuleModel {
  constructor(private defaultInput: DefaultHourHalfInputModel) {}
  rule = [
    {
      conditions: {
        all: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: 1,
          },
        ],
      },
      event: {
        type: 'Tarifa Hora por default',
        params: {
          value: this.defaultInput.costHour,
          path: 'hour',
        },
      },
    },
    {
      conditions: {
        all: [
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: 1,
          },
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: this.defaultInput.fromMinute,
          },
        ],
      },
      event: {
        type: 'Tarifa Fraccion por bloque',
        params: {
          value: this.defaultInput.costAHalf,
          path: 1,
        },
      },
    },
  ];
}

export class DefaultFixedCostRuleModel {
  constructor(private defaultInput: DefaultFixedCostInputModel) {}

  rule = [
    {
      conditions: {
        any: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: 1,
          },
          {
            all: [
              {
                fact: 'minute',
                operator: 'greaterThanInclusive',
                value: 1,
              },
              {
                fact: 'minute',
                operator: 'greaterThanInclusive',
                value: this.defaultInput.fromMinute,
              },
            ],
          },
        ],
      },
      event: {
        type: 'Tarifa Hora por default',
        params: {
          value: this.defaultInput.fixedCost,
          path: 1,
        },
      },
    },
  ];
}
