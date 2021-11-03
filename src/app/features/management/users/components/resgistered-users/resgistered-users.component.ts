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
  users: NewUserModel[] = new Array<NewUserModel>();

  constructor(private userService: UserService) {
    this.getInitialData();
  }

  ngOnInit(): void {}

  getInitialData() {
    this.userService
      .getAdminsByParking()
      .toPromise()
      .then((data: ResponseModel) => {
        data.data.administradores.data.forEach(
          (administrator: NewUserModel) => {
            this.users.push(administrator);
          }
        );
      })
      .then(() => {
        console.log(this.users);
      });
  }
}
