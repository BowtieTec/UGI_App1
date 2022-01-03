export class ConfirmCodeModel {
  validate_code: string = '';
  type: number = 1;
  email_phone: string = 'admin@correo.com';

  constructor(code: string, email: string) {
    this.validate_code = code;
    this.email_phone = email;
  }
}

export class ChangePasswordModel {
  newPassword: string = '';
  newPasswordConfirmation: string = '';
  userId: string = '';
}
