import { Injectable } from '@angular/core';
import { MessageService } from '../../../../shared/services/message.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../../../shared/model/Request.model';
import { RolesModel } from '../models/RolesModel';
import { NewUserModel } from '../models/newUserModel';
import { AuthService } from '../../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.serverAPI;
  roles: RolesModel[] = new Array<RolesModel>();
  newUser: NewUserModel = new NewUserModel();
  users: NewUserModel[] = new Array<NewUserModel>();
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    private authService: AuthService
  ) {
    this.getInitialData();
  }

  getInitialData() {
    this.getRoles()
      .toPromise()
      .then((data: ResponseModel) => {
        this.roles = data.data.roles;
        return data;
      })
      .then((data) => {
        this.messageService.hideLoading();
      })
      .then(() => {
        this.getAdminsByParking();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRoles() {
    this.messageService.showLoading();
    return this.http.get<ResponseModel>(`${this.apiUrl}backoffice/role`);
  }

  getAdminsByParking() {
    this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/admin/admins?page=1&per_page=1000&status=3`
      )
      .subscribe((data) => {
        this.users = [];
        data.data.administradores.data.forEach(
          (administrator: NewUserModel) => {
            this.users.push(administrator);
          }
        );
      });
  }
  saveNewUser(newUser: NewUserModel) {
    return this.http.post<ResponseModel>(
      `${this.apiUrl}backoffice/admin/signup`,
      newUser
    );
  }
}
