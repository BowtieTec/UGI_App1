export class UserResponseModel {
  sucess: boolean = false;
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
  user: string = '';
  status: number = 0;
  created_at!: Date;
  updated_at!: Date;
}
