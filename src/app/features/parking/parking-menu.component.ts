import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { PermissionsService } from '../../shared/services/permissions.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-parking-menu',
  templateUrl: './parking-menu.component.html',
  styleUrls: ['./parking-menu.component.css'],
})
export class ParkingMenuComponent {
  listParking = environment.listParking;
  createParking = environment.createParking;

  private actions: string[] = [];

  constructor(
    private authService: AuthService,
    private permissionService: PermissionsService
  ) {
    this.getActions();
  }

  getActions() {
    this.actions = this.permissionService.actionsOfPermissions;
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action);
  }
}
