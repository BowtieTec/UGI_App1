import { Time } from '@angular/common';

export class PermissionsModel {
  id: number = 0;
  module: string = '';
  submodule: string = '';
  action: string = '';
  description?: string = '';
  created_at?: Date;
  updated_at?: Date;
  checked: boolean = false;
}
