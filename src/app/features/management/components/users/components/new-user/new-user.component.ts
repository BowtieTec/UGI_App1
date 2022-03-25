import { Component, Input, OnInit } from '@angular/core'
import { UserService } from '../../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UtilitiesService } from '../../../../../../shared/services/utilities.service'
import { NewUserModel } from '../../models/newUserModel'
import { MessageService } from '../../../../../../shared/services/message.service'
import { Subject } from 'rxjs'
import { ParkingModel } from '../../../../../parking/models/Parking.model'
import { ParkingService } from '../../../../../parking/services/parking.service'
import { PermissionsService } from '../../../../../../shared/services/permissions.service'
import { environment } from '../../../../../../../environments/environment'

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  @Input() subject = new Subject<NewUserModel>()
  newUserForm: FormGroup
  isEdit = false
  allParking: ParkingModel[] = []
  changeParkingAtCreateUser: string = environment.changeParkingAtCreateUser

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private messageServices: MessageService,
    private parkingService: ParkingService,
    private permissionService: PermissionsService
  ) {
    this.newUserForm = this.createForm()
    this.getInitialData()
  }

  get Roles() {
    return this.userService.roles
  }

  get userRoleSelected() {
    return this.newUserForm.get('role')?.value
  }

  ifHaveAction(action: string) {
    return this.permissionService.ifHaveAction(action)
  }

  ngOnInit(): void {
    this.subject.subscribe((user: NewUserModel) => {
      console.log(user)
      if (user.name.length > 0) {
        this.newUserForm.controls['name'].setValue(user.name)
        this.newUserForm.controls['last_name'].setValue(user.last_name)
        this.newUserForm.controls['email'].setValue(user.email)
        this.newUserForm.controls['user'].setValue(user.user)
        this.newUserForm.controls['password'].setValue(
          'EstaPuedeOnoSerLaContraseña'
        )
        this.newUserForm.controls['role'].setValue(user.role)
        this.newUserForm.controls['name'].setValue(user.name)
        this.newUserForm.controls['parking'].setValue(user.parking)
        this.newUserForm.controls['id'].setValue(user.id)
        this.isEdit = true
      }
    })
  }

  async getInitialData() {
    this.messageServices.showLoading()
    this.allParking = await this.parkingService
      .getAllParking()
      .then((x) => x.data.parkings)

    this.messageServices.hideLoading()
  }

  getNewUserDataForm(): NewUserModel {
    return {
      email: this.newUserForm.controls['email'].value,
      last_name: this.newUserForm.controls['last_name'].value,
      name: this.newUserForm.controls['name'].value,
      password: this.newUserForm.controls['password'].value,
      role: this.newUserForm.controls['role'].value,
      user: this.newUserForm.controls['user'].value,
      id: this.newUserForm.controls['id'].value,
      parking: this.newUserForm.controls['parking'].value
    }
  }

  saveNewUser() {
    const newUserForm: NewUserModel = this.getNewUserDataForm()
    this.messageServices.showLoading()
    if (this.newUserForm.invalid) {
      this.messageServices.errorTimeOut('Datos incorrectos o faltantes.')
      return
    }
    if (this.isEdit) {
      delete newUserForm.password
      this.userService
        .editUser(this.getNewUserDataForm())
        .toPromise()
        .then((data) => {
          if (data.success) {
            return data.data
          } else {
            this.messageServices.error('', data.message)
          }
        })
        .then((data) => {
          this.userService
            .saveRole(this.getNewUserDataForm().role, data.admin.id)
            .toPromise()
            .then((dataRole) => {
              if (dataRole.success) {
                this.cleanForm()
                this.messageServices.OkTimeOut('Guardado')
              } else {
                this.messageServices.error('', dataRole.message)
              }
            })
            .then(() => {
              this.subject.next(new NewUserModel())
            })
        })
    } else {
      delete newUserForm.id
      this.userService
        .saveNewUser(newUserForm)
        .toPromise()
        .then((data) => {
          if (data.success) {
            this.messageServices.OkTimeOut('Guardado')
          } else {
            this.messageServices.error('', data.message)
          }
          this.cleanForm()
          this.isEdit = false
        })
        .then(() => {
          this.cleanForm()
          this.subject.next(new NewUserModel())
        })
    }
  }

  cleanForm() {
    this.newUserForm.controls['email'].setValue('')
    this.newUserForm.controls['last_name'].setValue('')
    this.newUserForm.controls['name'].setValue('')
    this.newUserForm.controls['password'].setValue('')
    this.newUserForm.controls['role'].setValue('')
    this.newUserForm.controls['user'].setValue('')
    this.newUserForm.controls['parking'].setValue('')
    this.utilitiesService.markAsUnTouched(this.newUserForm)
    this.isEdit = false
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.newUserForm, control)
  }

  private createForm() {
    return this.formBuilder.group({
      id: [''],
      name: [this.userService.newUser.name, [Validators.required]],
      last_name: [this.userService.newUser.last_name, [Validators.required]],
      email: [
        this.userService.newUser.email,
        [
          Validators.required,
          Validators.pattern(this.utilitiesService.getPatterEmail)
        ]
      ],
      user: [this.userService.newUser.user, [Validators.required]],
      password: [this.userService.newUser.password, [Validators.required]],
      role: [this.userService.newUser.role, [Validators.required]],
      parking: [this.userService.newUser.parking, [Validators.required]]
    })
  }
}
