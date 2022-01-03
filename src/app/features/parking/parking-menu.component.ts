import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { PermissionsService } from '../../shared/services/permissions.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-parked-menu',
  templateUrl: './parking-menu.component.html',
  styleUrls: ['./parking-menu.component.css'],
})
export class ParkingMenuComponent {
  listParking = environment.listParking;
  createParking = environment.createParking;
  listAntennas = environment.listAntennas;
  listMonthlyParking = environment.listMonthlyParking;
  listParkedParking = environment.listParkedParking;
  private actions: string[] = this.permissionService.actionsOfPermissions;

  constructor(
    private authService: AuthService,
    private permissionService: PermissionsService
  ) {}

  get parkingId() {
    return this.authService.getParking().id;
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action);
  }
}
