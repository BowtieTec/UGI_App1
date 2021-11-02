export class CreateParkingStepOneModel {
  parkingId: string = '';
  name: string = '';
  address: string = '';
  is_show_map: boolean = false;
  coordinates: Coordinates = new Coordinates();
  country: number = 0;
  parking_spaces: number = 0;
  special_parking_spaces: number = 0;
  rules: string = '';
  minutes_to_exit: number = 0;
}

export class CreateParkingStepTwoModel {
  parkingId: string = '';
  schedules?: Schedule[] = new Array<Schedule>();
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

export class CreateParkingStepFiveModel {
  parking: string = '';
  type: number = 0;
  name: string = '';
  antena: string = '';
  mac: string = '';
}

export class Coordinates {
  latitude: number = 0.0;
  longitude: number = 0.0;
}

export class Schedule {
  isOpen: boolean = true;
  day: number = 0;
  openning_time: TimeData = new TimeData();
  closing_time: TimeData = new TimeData();
}

export class TimeData {
  hour: string = '00';
  minute: string = '00';
  second: string = '00';
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
