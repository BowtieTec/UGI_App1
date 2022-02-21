export class ConfirmCodeModel {
  validate_code = ''
  type = 1
  email_phone = 'admin@correo.com'

  constructor(code: string, email: string) {
    this.validate_code = code
    this.email_phone = email
  }
}

export class ChangePasswordModel {
  newPassword = ''
  newPasswordConfirmation = ''
  userId = ''
}
