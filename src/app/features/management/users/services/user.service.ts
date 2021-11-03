import { Injectable } from '@angular/core';
import { MessageService } from '../../../../shared/services/message.service';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../../../../shared/model/Request.model';
import { RolesModel } from '../models/RolesModel';
import { NewUserModel } from '../models/newUserModel';
import { UtilitiesService } from '../../../../shared/services/utilities.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.serverAPI;
  roles: RolesModel[] = new Array<RolesModel>();
  newUser: NewUserModel = new NewUserModel();

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
      .catch((err) => {
        console.log(err);
      });
  }

  getRoles() {
    this.messageService.showLoading();
    return this.http.get<ResponseModel>(`${this.apiUrl}backoffice/role`);
  }
}
