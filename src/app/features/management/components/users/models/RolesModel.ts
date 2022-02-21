export class RolesModel {
  id = ''
  name = ''
  permissions: PermissionsModel[] = new Array<PermissionsModel>()
}

class PermissionsModel {
  id = ''
  module = ''
  action = ''
}
