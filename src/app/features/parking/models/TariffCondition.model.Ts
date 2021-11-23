export class HolidayRulesModel {
  name: string = "HolidayRules";
  attributes: Attribute[] = [
    {
      name: "StartDateTimeValue",
      type: "dateTime",
    },
    {
      name: "EndDateTimeValue",
      type: "dateTime",
    },
  ];
  decisions: Decision[] = [];
}

export class NewDecision {
  startDateTime: Date = new Date();
  endDateTime: Date = new Date();
  fixedCost: number = 0;
  hourCost: number = 0;
  hourHalfCost: number = 0;
}

export class Decision {
  newDecision: NewDecision = new NewDecision();
  conditions: Conditions = {
    all: [
      {
        fact: "StartDateTimeValue",
        operator: "greaterThanInclusive",
        value: this.newDecision.startDateTime,
      },
      {
        fact: "EndDateTimeValue",
        operator: "lessThanInclusive",
        value: this.newDecision.endDateTime,
      },
    ],
  };
  event: Event = {
    type: "ByHoliday",
    params: {
      fixedCost: this.newDecision.fixedCost,
      HourCost: this.newDecision.hourCost,
      HourHalfCost: this.newDecision.hourHalfCost,
    },
  };

  constructor(newDecision: NewDecision) {
    this.newDecision = newDecision;
  }
}

class Attribute {
  name: string = "";
  type: string = "";
}

class All {
  fact: string = "";
  operator: string = "";
  value: Date = new Date();
}

class Conditions {
  all: All[] = [];
}

class Params {
  fixedCost: number = 0;
  HourCost: number = 0;
  HourHalfCost: number = 0;
}

class Event {
  type: string = "ByHoliday";
  params: Params = new Params();
}
