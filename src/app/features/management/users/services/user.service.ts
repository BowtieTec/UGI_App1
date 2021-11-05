import { Injectable } from '@angular/core';
import { MessageService } from '../../../../shared/services/message.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../../../shared/model/Request.model';
import { RolesModel } from '../models/RolesModel';
import { NewUserModel } from '../models/newUserModel';


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
    private http: HttpClient
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
    console.log('Entrando ' + this.users.length);
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
        console.log('Saliendo ' + this.users.length);
      });
  }

  saveNewUser(newUser: NewUserModel) {
    return this.http.post<ResponseModel>(
      `${this.apiUrl}backoffice/admin/signup`,
      newUser
    );
  }

  editUser(newUser: NewUserModel) {
    return this.http.post<ResponseModel>(
      `${this.apiUrl}backoffice/admin/edit`,
      newUser
    );
  }

  deleteUser(id: string) {
    this.http
      .delete<ResponseModel>(`${this.apiUrl}backoffice/admin/${id}`)
      .subscribe((data) => {
        if (data.success) {
          this.messageService.Ok('Eliminado');
          this.getAdminsByParking();
        } else {
          this.messageService.error('', data.message);
        }
      });
  }
}
