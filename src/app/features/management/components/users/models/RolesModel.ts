export class RolesModel {
  id: string = '';
  name: string = '';
  permissions: PermissionsModel[] = new Array<PermissionsModel>();
}

class PermissionsModel {
  id: string = '';
  module: string = '';
  action: string = '';
}
