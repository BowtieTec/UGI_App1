import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../users/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../../shared/services/utilities.service';
import { MessageService } from '../../../../shared/services/message.service';
import { PermissionsModel } from './models/Permissions.model';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { DataTableOptions } from '../../../../shared/model/DataTableOptions';
import { RolesService } from './services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit, AfterViewInit, OnDestroy {
  newRoleForm: FormGroup;
  permissionsForRole: Array<PermissionsModel> = [];
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;
  permissions: PermissionsModel[] = [];
  permissionsForRoleData: PermissionsModel[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private roleService: RolesService,
    private messageServices: MessageService
  ) {
    this.newRoleForm = this.createForm();
    this.formGroup = formBuilder.group({ filter: [''] });
  }

  ngOnInit(): void {
    this.dtOptions = DataTableOptions.getSpanishOptions(10);
    this.getInitialData();
  }

  getInitialData() {
    this.messageServices.showLoading();
    this.getPermissions().then(() => {
      this.messageServices.hideLoading();
    });
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
          this.permissions = data.data.permissions;
        } else {
          this.messageServices.error(
            '',
            'No pudo obtenerse la data necesaria. Por favor intente mas tarde.'
          );
        }
      });
  }

  private rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
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

  deletePermission(permission: PermissionsModel) {}

  changeRole() {
    this.getPermissionsForRole(this.newRoleForm.controls['role'].value).then(
      () => this.rerender()
    );
  }
}
