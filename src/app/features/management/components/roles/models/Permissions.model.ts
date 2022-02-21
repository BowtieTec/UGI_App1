export class PermissionsModel {
  id = 0
  module = ''
  submodule = ''
  action = ''
  description?: string = ''
  created_at?: Date
  updated_at?: Date
  checked = false
}

export class PermissionSaveModel {
  roleId = ''
  permissions: Array<any> = []
}
