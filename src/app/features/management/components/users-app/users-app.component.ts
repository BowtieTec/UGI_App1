import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core'
import { environment } from '../../../../../environments/environment'
import { Subject } from 'rxjs'
import { NewUserModel } from '../users/models/newUserModel'
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup } from '@angular/forms'
import { UserService } from '../users/services/user.service'
import { MessageService } from '../../../../shared/services/message.service'
import { PermissionsService } from '../../../../shared/services/permissions.service'
import { DataTableOptions } from '../../../../shared/model/DataTableOptions'
import { stat } from 'fs'
import { UserModel } from '../../../../shared/model/UserResponse.model'
import { UtilitiesService } from '../../../../shared/services/utilities.service'
import { tariffTestModel } from '../tariff-test/models/tariff-test.model'

@Component({
  selector: 'app-users-app',
  templateUrl: './users-app.component.html',
  styleUrls: ['./users-app.component.css']
})
export class UsersAppComponent implements OnInit, OnDestroy, AfterViewInit {
  deleteUser = environment.deleteUser
  editUser = environment.editUser
  @Input() subject: Subject<NewUserModel> = new Subject<NewUserModel>()
  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective
  dtTrigger: Subject<any> = new Subject()
  formGroup: FormGroup
  users: NewUserModel[] = []

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private permissionsService: PermissionsService
  ) {
    this.formGroup = formBuilder.group({ filter: [''] })
  }

  get dtOptions() {
    return DataTableOptions.getSpanishOptions(10)
  }

  ngOnInit(): void {
    this.getUsersApp()
    this.subject.subscribe((user: NewUserModel) => {
      this.getUsersApp()
    })
  }

  ifHaveAction(action: string) {
    return this.permissionsService.ifHaveAction(action)
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next()
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  getStatus(status: number) {
    switch (status) {
      case 1:
        return 'Sin confirmar'
      case 2:
        return 'Sin información General'
      case 3:
        return 'Aceptando terminos y condiciones'
      case 4:
        return 'Habilitado'
      case 5:
        return 'Habilitado'
      default:
        return 'Inhabilitado'
    }
  }

  getEmailEdit(user: NewUserModel){
    this.isEditEmail = !!(user.appleId || user.googleId)
    console.log(this.isEditEmail)
  }

  getRegister(user: NewUserModel){
    if(user.appleId){
      return 'AppleId'
    }else if(user.googleId){
      return 'AppleId'
    }else{
      return 'Registro Normal'
    }
  }


  private getUsersApp() {
    this.userService
      .getUsersApp()
      .toPromise()
      .then((data) => {
        this.users = data.data.users
        this.rerender()
        this.message.hideLoading()
      })
  }

  private rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy()
      this.dtTrigger.next()
    })
  }
}
