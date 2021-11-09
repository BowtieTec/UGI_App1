import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseModel } from '../model/Request.model';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { OptionMenuModel } from '../model/OptionMenu.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  private apiUrl = environment.serverAPI;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  getPermissions() {
    const userId = this.auth.getUser().user.id;
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/admin/role/permissions/${userId}`
      )
      .pipe(
        map((data) => {
          return data.data;
        })
      );
  }

  getMenuOptionsValidated() {
    this.messageService.showLoading();
    let options: OptionMenuModel[] = environment.leftMenu;
    let menu: OptionMenuModel[] = Array<OptionMenuModel>();
    return this.getPermissions()
      .toPromise()
      .then((permissions: any) => {
        options.forEach((option: OptionMenuModel) => {
          if (
            permissions.permissions.find(
              (permission: any) => permission.module == option.module
            )
          ) {
            menu.push(option);
          }
        });
        this.messageService.hideLoading();
        return menu;
      });
  }
}
