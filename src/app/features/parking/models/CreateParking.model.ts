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
  schedules?: Schedule[] = new Array<Schedule>();

  constructor() {}
}

export class Schedule {
  isOpen: boolean = true;
  day: number = 0;
  openning_time?: TimeData;
  closing_time?: TimeData;
}

export class TimeData {
  hour: string = '00';
  minute: string = '00';
  second: string = '00';
}

export class CreateParkingStepFourModel {
  parkingId: string = '';
  nit: string = '';
  business_address: string = '';
  business_name: string = '';
  pay_method: number = 0;
  currency: number = 0;
  is_our_visa_credential: boolean = false;
  is_our_bac_credential: boolean = false;
  visa_credential!: VisaCredentialModel;
  bac_credential!: BacCredentialModel;
}

export class VisaCredentialModel {
  merchant_id: string = '';
  transaction_key: string = '';
  url: string = '';
}

export class BacCredentialModel {
  merchant_id: string = '';
  acquirer_id: string = '';
  purchase_currency: string = '';
  pmtnpssw: string = '';
  url: string = '';
}

export class AccessModel {
  value: number = 0;
  accessType: string = '';
}
