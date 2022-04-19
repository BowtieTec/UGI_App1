export class PaymentMethodModel {
  id = 0
  description = ''
}

export class CurrencyOptionModel {
  id = 0
  name = ''
}

export class ParkingStatusModel {
  id = 0
  description = ''
}

export class Day {
  id = 0
  name = ''
}

export class SettingsOptionsModel {
  paymentMethods: PaymentMethodModel[] = Array<PaymentMethodModel>()
  currencyOptions: CurrencyOptionModel[] = Array<CurrencyOptionModel>()
  parkingStatus: ParkingStatusModel[] = Array<ParkingStatusModel>()
  days: Day[] = Array<Day>()
}
