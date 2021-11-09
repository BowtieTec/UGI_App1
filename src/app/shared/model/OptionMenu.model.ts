export class OptionMenuModel {
  path: string = '';
  module: string = '';
  description: string = '';
  icon?: string = '';
  isShow?: boolean = true;
}

export class MenuAccessModel {
  id: string = '';
  module: string = '';
  submodule?: string = '';
  action: string = '';
}
