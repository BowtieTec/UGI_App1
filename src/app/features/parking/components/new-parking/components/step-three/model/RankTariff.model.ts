import { Time } from '@angular/common';

export class RankHourHalfInputModel {
  fromTime!: Time;
  toTime!: Time;
  fromMinute: number = 0;
  costHour: number = 0;
  costAHalf: number = 0;
}

export class RankFixedCostInputModel {
  fromTime!: Time;
  toTime!: Time;
  fromMinute: number = 0;
  fixedCost: number = 0;
}

export class RankHourHalfRuleModel {
  constructor(private rankInput: RankHourHalfInputModel) {}

  rule = [
    {
      conditions: {
        all: [
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.hours,
          },
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.hours,
          },
          {
            fact: 'hour',
            path: '$.hour',
            operator: 'greaterThanInclusive',
            value: 1,
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.minutes,
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.minutes,
          },
        ],
      },
      event: {
        type: 'Tarifa Hora por horario',
        params: {
          value: this.rankInput.costHour,
          path: '$.hour',
        },
      },
    },
    {
      conditions: {
        all: [
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.hours,
          },
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.hours,
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.minutes,
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.minutes,
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromMinute,
          },
        ],
      },
      event: {
        type: 'Tarifa Fraccion',
        params: {
          value: this.rankInput.costAHalf,
          path: 1,
        },
      },
    },
  ];
}

export class RankFixedCostRuleModel {
  constructor(private rankInput: RankFixedCostInputModel) {}

  rule = [
    {
      conditions: {
        all: [
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.hours,
          },
          {
            fact: 'date_out_object',
            path: '$.hour',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.hours,
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'greaterThanInclusive',
            value: this.rankInput.fromTime.minutes,
          },
          {
            fact: 'date_out_object',
            path: '$.minute',
            operator: 'lessThanInclusive',
            value: this.rankInput.toTime.minutes,
          },
          {
            any: [
              {
                fact: 'date_out_object',
                path: '$.hour',
                operator: 'greaterThanInclusive',
                value: 1,
              },
              {
                fact: 'date_out_object',
                path: '$.minute',
                operator: 'greaterThanInclusive',
                value: this.rankInput.fromMinute,
              },
            ],
          },
        ],
      },
      event: {
        type: 'Tarifa Fraccion',
        params: {
          value: this.rankInput.fixedCost,
          path: 1,
        },
      },
    },
  ];
}
