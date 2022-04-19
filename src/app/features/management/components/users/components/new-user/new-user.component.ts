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
import { AuthService } from '../../../../../../shared/services/auth.service'

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
  parkingId: string = this.authService.getParking().id
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private messageServices: MessageService,
    private parkingService: ParkingService,
    private permissionService: PermissionsService,
    private authService: AuthService
  ) {
    this.newUserForm = this.createForm()
    this.getInitialData().catch()
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
        ? this.newUserForm.controls['parking'].value
        : this.parkingId
    }
  }

  saveNewUser() {
    if (this.newUserForm.invalid) {
      this.messageServices.error('', 'Datos no válidos o faltantes')
      return
    }
    let newUserValue: NewUserModel = this.getNewUserDataForm()
    if (!newUserValue) {
      this.utilitiesService.markAsTouched(this.newUserForm)
      this.messageServices.errorTimeOut('Datos incorrectos o faltantes.')
      return
    }
    this.messageServices.showLoading()
    if (this.isEdit) {
      delete newUserValue.password
      this.userService
        .editUser(newUserValue)
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
      delete newUserValue.id
      this.userService
        .saveNewUser(newUserValue)
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
        .catch((x) => {
          throw new Error(x.error.message)
        })
        .then(() => {
          this.cleanForm()
          this.subject.next(new NewUserModel())
        })
    }
  }

  cleanForm() {
    this.newUserForm.reset()
    this.isEdit = false
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.newUserForm, control)
  }

  private createForm() {
    return this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.utilitiesService.getPatterEmail)
        ]
      ],
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['0', [Validators.required]],
      parking: [this.parkingId, [Validators.required]]
    })
  }
}
