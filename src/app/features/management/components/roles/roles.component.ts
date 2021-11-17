import { Component, OnInit } from '@angular/core';
import { UserService } from '../users/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import { MessageService } from '../../../../shared/services/message.service';
import { PermissionsModel } from './models/Permissions.model';
import { RolesService } from './services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
  newRoleForm: FormGroup;
  permissions: PermissionsModel[] = [];
  permissionsForRoleData: PermissionsModel[] = [];
  modules: string[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private roleService: RolesService,
    private messageServices: MessageService
  ) {
    this.newRoleForm = this.createForm();
  }

  ngOnInit(): void {
    this.getInitialData();
  }

  getInitialData() {
    this.messageServices.showLoading();
    this.getPermissions().then(() => {
      this.messageServices.hideLoading();
    });
  }

  get getModules() {
    return [...new Set(Array.from(this.permissions, (x) => x.module))];
  }

  getPermissionsForModules(module: string): Array<PermissionsModel> {
    let result = this.permissions.filter((x) => x.module == module);
    result = result == undefined ? [] : result;
    return this.permissions.filter((x) => x.module == module);
  }

  get Roles() {
    return this.userService.roles;
  }

  controlInvalid(control: string) {
    return this.utilitiesService.controlInvalid(this.newRoleForm, control);
  }

  private createForm() {
    return this.formBuilder.group({
      role: [this.userService.newUser.role, [Validators.required]],
      permission: ['', [Validators.required]],
    });
  }

  getPermissions() {
    return this.roleService
      .getAllPermissions()
      .toPromise()
      .then((data) => {
        if (data.success) {
          this.permissions = data.data.permissions.sort((x: any) => x.module);
          this.modules = this.getModules;
        } else {
          this.messageServices.error(
            '',
            'No pudo obtenerse la data necesaria. Por favor intente mas tarde.'
          );
        }
      });
  }

  getPermissionsForRole(id: string) {
    return this.roleService
      .getPermissionsForRole()
      .toPromise()
      .then((data) => {
        console.log(data.data.roles);
        this.permissionsForRoleData = data.data.roles.find(
          (x: any) => x.id == id
        ).permissions;
        console.log(this.permissionsForRoleData);
        if (data.success) {
        } else {
          this.messageServices.error(
            '',
            'No se pudo cargar la información solicitada. Error: ' +
              data.message
          );
        }
      });
  }

  changeRole() {
    //this.messageServices.showLoading();
  }

  onChangeCheckBox(perm: PermissionsModel, event: Event) {
    console.log(event.target);
    //this.permissionsForRoleData.push(perm);
  }
}
