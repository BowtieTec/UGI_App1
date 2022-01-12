import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { PermissionsService } from '../../shared/services/permissions.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-managment',
  templateUrl: './management-menu.component.html',
  styleUrls: ['./management-menu.component.css'],
})
export class ManagementMenuComponent {
  assignRole = environment.assignRole;
  createUser = environment.createUser;


  constructor(
    private authService: AuthService,
    private permissionService: PermissionsService
  ) {}

  ifHaveAction(action: string) {
    return this.permissionService.ifHaveAction(action);
  }
}
