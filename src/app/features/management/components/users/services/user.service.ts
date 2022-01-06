import { Injectable } from '@angular/core';
import { MessageService } from '../../../../../shared/services/message.service';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../../../../shared/model/Request.model';
import { RolesModel } from '../models/RolesModel';
import { NewUserModel } from '../models/newUserModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  roles: RolesModel[] = new Array<RolesModel>();
  newUser: NewUserModel = new NewUserModel();
  users: NewUserModel[] = new Array<NewUserModel>();
  private apiUrl = environment.serverAPI;

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {
    this.getInitialData();
  }

  getInitialData() {
    this.messageService.showLoading();
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
        this.messageService.hideLoading();
      });
  }

  getRoles() {
    this.messageService.showLoading();
    return this.http.get<ResponseModel>(`${this.apiUrl}backoffice/role`);
  }

  getUsers(): Observable<any> {
    this.messageService.showLoading();
    return this.http.get<ResponseModel>(
      `${this.apiUrl}backoffice/admin/admins?page=1&per_page=1000&status=3`
    );
  }

  getAdminsByParking() {
    this.messageService.showLoading();
    this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/admin/admins?page=1&per_page=1000&status=3`
      )
      .subscribe((data) => {
        this.users = [];
        data.data.administradores.data.forEach((administrator: any) => {
          this.users.push({
            role: administrator.role == null ? '' : administrator.role.id,
            name: administrator.name,
            id: administrator.id,
            user: administrator.user,
            idParking: administrator.idParking,
            email: administrator.email,
            password: administrator.password,
            last_name: administrator.last_name,
          });
        });
        this.messageService.hideLoading();
      });
  }

  saveNewUser(newUser: NewUserModel) {
    return this.http.post<ResponseModel>(
      `${this.apiUrl}backoffice/admin/signup`,
      newUser
    );
  }

  editUser(newUser: NewUserModel) {
    return this.http.put<ResponseModel>(
      `${this.apiUrl}backoffice/admin/update/${newUser.id}`,
      newUser
    );
  }

  deleteUser(id: string) {
    return this.http.delete<ResponseModel>(
      `${this.apiUrl}backoffice/admin/${id}`
    );
  }

  saveRole(role: string, id: string) {
    const assignRole = {
      adminId: id,
      roleId: role,
    };
    console.log(assignRole);
    return this.http.put<ResponseModel>(
      `${this.apiUrl}backoffice/admin/role`,
      assignRole
    );
  }
}
