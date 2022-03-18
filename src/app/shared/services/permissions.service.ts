import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { ResponseModel } from '../model/Request.model'
import { environment } from '../../../environments/environment'
import { AuthService } from './auth.service'
import { map } from 'rxjs/operators'
import { OptionMenuModel } from '../model/OptionMenu.model'
import { MessageService } from './message.service'

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  actions: string[] = []
  private apiUrl = environment.serverAPI

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private messageService: MessageService
  ) {}

  get actionsOfPermissions() {
    return this.actions
  }

  getPermissions() {
    const userId = this.auth.getUser().user.id
    return this.http
      .get<ResponseModel>(
        `${this.apiUrl}backoffice/admin/role/permissions/${userId}`
      )
      .pipe(
        map((data) => {
          return data.data
        })
      )
  }

  ifHaveAction(action: string) {
    return !!this.actions.find((x) => x == action)
  }

  getMenuOptionsValidated() {
    this.messageService.showLoading()
    const options: OptionMenuModel[] = environment.leftMenu
    const menu: OptionMenuModel[] = Array<OptionMenuModel>()
    return this.getPermissions()
      .toPromise()
      .then((permissions: any) => {
        this.actions = permissions.permissions.map((a: any) => a.action)
        options.forEach((option: OptionMenuModel) => {
          if (
            permissions.permissions.find(
              (permission: any) => permission.module == option.module
            )
          ) {
            menu.push(option)
          }
        })
        this.messageService.hideLoading()
        return menu
      })
  }
}
