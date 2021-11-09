import { Component, Input, OnInit } from '@angular/core';
import { NewUserModel } from '../../models/newUserModel';
import { UserService } from '../../services/user.service';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataTableOptions } from '../../../../../shared/model/DataTableOptions';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-resgistered-users',
  templateUrl: './resgistered-users.component.html',
  styleUrls: ['./resgistered-users.component.css'],
})
export class ResgisteredUsersComponent implements OnInit {
  @Input() subject: Subject<NewUserModel> = new Subject<NewUserModel>();
  formGroup: FormGroup;
  dtOptions: DataTables.Settings = {};

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.formGroup = formBuilder.group({ filter: [''] });
  }

  get users() {
    return this.userService.users;
  }

  ngOnInit(): void {
    this.dtOptions = DataTableOptions.getSpanishOptions(10);
  }

  deleteUser(user: NewUserModel) {
    this.userService.deleteUser(user.id == undefined ? '' : user.id);
  }

  editUser(user: NewUserModel) {
    this.subject.next(user);
  }
}
