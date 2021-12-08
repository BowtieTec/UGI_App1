export class MonthlyUserModel {
  id: string = '';
  name: string = '';
  last_name: string = '';
  email: string = '';
  phone_number: string = '';
}

export class ProfilesModel {
  id: number = 0;
  name: string = '';
  deleted: number = 0;
}

export class SubscriptionModel {
  id: string = '';
  begin_date: string = '';
  finish_date: string = '';
  deleted: number = 0;
  isUnlimited: number = 1;
  status: number = 1;
  amount: number = 400;
  user = {
    id: '',
    name: '',
    last_name: '',
    email: '',
    phone_number: '',
  };
  profile_subscription = {
    id: 0,
    name: '',
    deleted: 0,
  };
}
