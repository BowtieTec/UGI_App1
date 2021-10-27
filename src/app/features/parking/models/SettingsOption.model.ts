export interface PaymentMethodModel {
  id: number;
  description: string;
}

export interface CurrencyOptionModel {
  id: number;
  description: string;
}

export interface ParkingStatusModel {
  id: number;
  description: string;
}

export interface Day {
  id: number;
  description: string;
}

export interface SettingsOptionsModel {
  paymentMethods: PaymentMethodModel[];
  currencyOptions: CurrencyOptionModel[];
  parkingStatus: ParkingStatusModel[];
  days: Day[];
}
