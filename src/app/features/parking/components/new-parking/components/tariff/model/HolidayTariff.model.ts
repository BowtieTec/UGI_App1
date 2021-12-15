export class HolidayHourHalfInputModel {
  static_descriptionTime: string = '';
  static_descriptionCost: string = '';
  fromDate: Date = new Date();
  toDate: Date = new Date();
  fromMinute: number = 0;
  costHour: number = 0;
  costAHalf: number = 0;
}

export class HolidayFixedCostInputModel {
  static_descriptionTime: string = '';
  static_descriptionCost: string = '';
  fromDate: Date = new Date();
  toDate: Date = new Date();
  fromMinute: number = 0;
  fixedCost: number = 0;
}

export class HolidayHourHalfRuleModel {
  static_description: string =
    this.holidayInput.static_descriptionTime +
    ' ' +
    this.holidayInput.static_descriptionCost;
  rule = [
    {
      conditions: {
        all: [
          {
            fact: 'date_out',
            operator: 'dateIsGreaterThan',
            value: this.holidayInput.fromDate,
          },
          {
            fact: 'date_out',
            operator: 'dateIsLessThan',
            value: this.holidayInput.toDate,
          },
          {
            fact: 'hour',
            operator: 'greaterThanInclusive',
            value: 1,
          },
        ],
      },
      event: {
        type: 'Tarifa por Hora y dia festivo',
        params: {
          value: this.holidayInput.costHour,
          path: 'hour',
        },
      },
    },
    {
      conditions: {
        all: [
          {
            fact: 'date_out',
            operator: 'dateIsGreaterThan',
            value: this.holidayInput.fromDate,
          },
          {
            fact: 'date_out',
            operator: 'dateIsLessThan',
            value: this.holidayInput.toDate,
          },
          {
            fact: 'minute',
            operator: 'greaterThanInclusive',
            value: this.holidayInput.fromMinute,
          },
        ],
      },
      event: {
        type: 'Tarifa por Fracción y dia festivo',
        params: {
          value: this.holidayInput.costAHalf,
          path: 1,
        },
      },
    },
  ];

  constructor(private holidayInput: HolidayHourHalfInputModel) {}
}

export class HolidayHourFixedCostModel {
  static_description: string =
    this.holidayInput.static_descriptionTime +
    ' ' +
    this.holidayInput.static_descriptionCost;
  rule = [
    {
      conditions: {
        all: [
          {
            fact: 'date_out',
            operator: 'dateIsGreaterThan',
            value: this.holidayInput.fromDate,
          },
          {
            fact: 'date_out',
            operator: 'dateIsLessThan',
            value: this.holidayInput.toDate,
          },
          {
            any: [
              {
                fact: 'hour',
                operator: 'greaterThanInclusive',
                value: 1,
              },
              {
                fact: 'minute',
                operator: 'greaterThanInclusive',
                value: this.holidayInput.fromMinute,
              },
            ],
          },
        ],
      },
      event: {
        type: 'Dia festivo y costo fijo',
        params: {
          value: this.holidayInput.fixedCost,
          path: 1,
        },
      },
    },
  ];

  constructor(private holidayInput: HolidayFixedCostInputModel) {}
}
