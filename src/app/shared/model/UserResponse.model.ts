export class UserResponseModel {
  success: boolean = false;
  message: string = '';
  data!: AuthModel;
}

export class AuthModel {
  user!: UserModel;
  token: string = '';
}

export class UserModel {
  id: string = '';
  name: string = '';
  last_name: string = '';
  email: string = '';
  parking!: ParkingAuthModel;
  role!: RoleAuthModel;
  user: string = '';
  status: number = 0;
}

export class ParkingAuthModel {
  id: string = '';
  name: string = '';
  address: string = '';
  parking_spaces: string = '';
  special_parking_spaces: string = '';
  rules: string = '';
  status: number = 0;
  nit: any;
  business_address: any;
  business_name: any;
  minutes_to_exit: number = 0;
  is_show_map: number = 0;
  currency: any;
  schedules: any;
  pay_method: any;
  is_our_bac_credential: any;
  is_our_visa_credential: any;
}

export class RoleAuthModel {
  id: string = '';
  name: string = '';
  isSudo: boolean = false;
}
