import { Component, OnInit } from '@angular/core';
import { ResponseModel } from '../../../../../shared/model/Request.model';
import { NewUserModel } from '../../models/newUserModel';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-resgistered-users',
  templateUrl: './resgistered-users.component.html',
  styleUrls: ['./resgistered-users.component.css'],
})
export class ResgisteredUsersComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  get users() {
    return this.userService.users;
  }
}
