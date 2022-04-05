export class CreateParkingStepOneModel {
  parkingId = ''
  name = ''
  address = ''
  is_show_map = false
  coordinates: Coordinates = new Coordinates()
  country = 0
  parking_spaces = 0
  special_parking_spaces = 0
  rules = ''
  minutes_to_exit = 0
  public?: boolean = false
  is_draft?: boolean = false
  is_TAS?: boolean = false
}

export class CreateParkingStepTwoModel {
  parkingId = ''
  schedules?: Schedule[] = new Array<Schedule>()
}

export class CreateParkingStepFourModel {
  parkingId = ''
  nit = ''
  business_address = ''
  business_name = ''
  pay_method = 0
  currency = 0
  is_our_visa_credential = false
  is_our_bac_credential = false
  visa_credential!: VisaCredentialModel
  bac_credential!: BacCredentialModel
}

export class CreateParkingFileModel {
  parkingId = ''
  logo = ''
  rate = ''
  plans = ''
}

export class CreateParkingStepFiveModel {
  id?: string = ''
  parking: any
  type = 0
  name = ''
  antena = ''
  mac = ''
  isPrivate = false
  created_at?: string = ''
  updated_at?: string = ''
}

export class Coordinates {
  latitude = 0.0
  longitude = 0.0
}

export class Schedule {
  isOpen = true
  day = 0
  openning_time: TimeData = new TimeData()
  closing_time: TimeData = new TimeData()
}

export class TimeData {
  hour = '00'
  minute = '00'
  second = '00'
}

export class VisaCredentialModel {
  cardAcqId = ''
  merchant_user = ''
  merchant_password = ''
  terminal = ''
}

export class BacCredentialModel {
  merchant_id = ''
  acquirer_id = ''
  purchase_currency = ''
  pmtnpssw = ''
  url = ''
}

export class AccessModel {
  id = 0
  name = ''
}
