import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NewUserModel } from '../../models/newUserModel';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableOptions } from '../../../../../../shared/model/DataTableOptions';
import { DataTableDirective } from 'angular-datatables';
import { MessageService } from '../../../../../../shared/services/message.service';
import { PermissionsService } from '../../../../../../shared/services/permissions.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-resgistered-users',
  templateUrl: './resgistered-users.component.html',
  styleUrls: ['./resgistered-users.component.css'],
})
export class ResgisteredUsersComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  deleteUser = environment.deleteUser;
  editUser = environment.editUser;
  @Input() subject: Subject<NewUserModel> = new Subject<NewUserModel>();
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  formGroup: FormGroup;
  users: NewUserModel[] = [];

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private permissionsService: PermissionsService
  ) {
    this.formGroup = formBuilder.group({ filter: [''] });
  }

  ngOnInit(): void {
    this.dtOptions = DataTableOptions.getSpanishOptions(10);
    this.getUsers();
    this.subject.subscribe((user: NewUserModel) => {
      this.getUsers();
    });
  }

  ifHaveAction(action: string) {
    return this.permissionsService.ifHaveAction(action);
  }

  deleteTheUser(user: NewUserModel) {
    this.message.showLoading();
    this.userService
      .deleteUser(user.id == undefined ? '' : user.id)
      .subscribe((data) => {
        if (data.success) {
          this.message.Ok('Eliminado');
          this.getUsers();
        } else {
          this.message.errorTimeOut('', data.message);
        }
      });
  }

  editTheUser(user: NewUserModel) {
    this.subject.next(user);
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  private getUsers() {
    this.userService
      .getUsers()
      .toPromise()
      .then((data) => {
        let results = data.data.administradores.data;
        results.forEach((result: any) => {
          result.role = result.role == null ? '' : result.role.id;
        });
        return results;
      })
      .then((results) => {
        this.users = results;
        this.rerender();
        this.message.hideLoading();
      });
  }

  private rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}
