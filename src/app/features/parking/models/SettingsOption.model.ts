export class PaymentMethodModel {
  id: number = 0;
  description: string = '';
}

export class CurrencyOptionModel {
  id: number = 0;
  description: string = '';
}

export class ParkingStatusModel {
  id: number = 0;
  description: string = '';
}

export class Day {
  id: number = 0;
  description: string = '';
}

export class SettingsOptionsModel {
  paymentMethods: PaymentMethodModel[] = Array<PaymentMethodModel>();
  currencyOptions: CurrencyOptionModel[] = Array<CurrencyOptionModel>();
  parkingStatus: ParkingStatusModel[] = Array<ParkingStatusModel>();
  days: Day[] = Array<Day>();
}
