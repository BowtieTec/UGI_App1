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
      .catch((err) => {});
  }

  getRoles() {
    this.messageService.showLoading();
    return this.http.get<ResponseModel>(`${this.apiUrl}backoffice/role`);
  }

  getAdminsByParking() {
    this.messageService.showLoading();
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/admin/?page=1&per_page=1000&status=3&parking=fe449e24-6b99-461f-a9f0-d8edae472072`
    );
  }

  saveNewUser(newUser: NewUserModel) {
    return this.http.post<ResponseModel>(
      `${this.apiUrl}backoffice/admin/signup`,
      newUser
    );
  }
}
