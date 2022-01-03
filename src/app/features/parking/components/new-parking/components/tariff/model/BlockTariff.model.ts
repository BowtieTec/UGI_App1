export class BlockHourHalfInputModel {
  static_descriptionTime: string = '';
  static_descriptionCost: string = '';
  lowerLimit: number = 0;
  upperLimit: number = 0;
  fromMinute: number = 0;
  costHour: number = 0;
  costAHalf: number = 0;
}

export class BlockFixedCostInputModel {
  static_descriptionTime: string = '';
  static_descriptionCost: string = '';
  lowerLimit: number = 0;
  upperLimit: number = 0;
  fromMinute: number = 0;
  fixedCost: number = 0;
}

export class BlockHourHalfRuleModel {
  static_description: string =
    this.blockInput.static_descriptionTime +
    ' ' +
    this.blockInput.static_descriptionCost;
  rule = [
    {
      conditions: {
        all: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: this.blockInput.lowerLimit,
          },
          {
            fact: 'hour',
            operator: 'LessThanInclusive',
            value: this.blockInput.upperLimit,
          },
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: 1,
          },
        ],
      },
      event: {
        type: 'Tarifa Hora por bloque',
        params: {
          value: this.blockInput.costHour,
          path: 'hour',
        },
      },
    },
    {
      conditions: {
        all: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: this.blockInput.lowerLimit,
          },
          {
            fact: 'hour',
            operator: 'LessThanInclusive',
            value: this.blockInput.upperLimit,
          },
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: this.blockInput.fromMinute,
          },
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: 1,
          },
        ],
      },
      event: {
        type: 'Tarifa Fraccion por bloque',
        params: {
          value: this.blockInput.costAHalf,
          path: 1,
        },
      },
    },
  ];

  constructor(private blockInput: BlockHourHalfInputModel) {}
}

export class BlockFixedCostRuleModel {
  static_description: string =
    this.blockInput.static_descriptionTime +
    ' ' +
    this.blockInput.static_descriptionCost;
  rule = [
    {
      conditions: {
        all: [
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: this.blockInput.lowerLimit,
          },
          {
            fact: 'hour',
            operator: 'LessThanInclusive',
            value: this.blockInput.upperLimit,
          },
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: 1,
          },
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: this.blockInput.fromMinute,
          },
        ],
      },
      event: {
        type: 'Tarifa Hora por bloque',
        params: {
          value: this.blockInput.fixedCost,
          path: 1,
        },
      },
    },
  ];

  constructor(private blockInput: BlockFixedCostInputModel) {}
}
