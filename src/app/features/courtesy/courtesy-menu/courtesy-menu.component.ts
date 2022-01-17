import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {PermissionsService} from "../../../shared/services/permissions.service";

@Component({
  selector: 'app-courtesy-menu',
  templateUrl: './courtesy-menu.component.html',
  styleUrls: ['./courtesy-menu.component.css']
})
export class CourtesyMenuComponent {

  constructor(private authService: AuthService,
              private permissionService: PermissionsService) { }



  ifHaveAction(action: string) {
    return this.permissionService.ifHaveAction(action);
  }
}
