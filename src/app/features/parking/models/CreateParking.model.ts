export class CreateParkingStepOneModel {
  name: string = '';
  address: string = '';
  is_show_map: boolean = false;
  coordinates?: Coordinates;
  country: number = 0;
  parking_spaces: number = 0;
  special_parking_spaces: number = 0;
  rules: string = '';
  minutes_to_exit: number = 0;
}

export class Coordinates {
  latitude: number = 0.0;
  longitude: number = 0.0;
}

export class CreateParkingStepTwoModel {
  parkingId: string = '';
  schedules?: Schedule[];
}

export class Schedule {
  isOpen: boolean = false;
  day: number = 0;
  openning_time?: Time;
  closing_time?: Time;
}

export class Time {
  hour: string = '00';
  minute: string = '00';
  second: string = '00';
}

export class CreateParkingStepFourModel {
  nit: string = '';
  business_address: string = '';
  business_name: string = '';
  pay_method: number = 0;
  currency: number = 0;
}
