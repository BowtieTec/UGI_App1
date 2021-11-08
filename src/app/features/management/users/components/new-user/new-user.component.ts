import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';
import { NewUserModel } from '../../models/newUserModel';
import { MessageService } from '../../../../../shared/services/message.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  @Input() subject = new Subject<NewUserModel>();
  newUserForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService,
    private messageServices: MessageService
  ) {
    this.newUserForm = this.createForm();
  }

  ngOnInit(): void {
    this.subject.subscribe((user: NewUserModel) => {
      this.newUserForm.controls['name'].setValue(user.name);
      this.newUserForm.controls['last_name'].setValue(user.last_name);
      this.newUserForm.controls['email'].setValue(user.email);
      this.newUserForm.controls['user'].setValue(user.user);
      this.newUserForm.controls['password'].setValue(user.password);
      this.newUserForm.controls['role'].setValue(user.role);
      this.newUserForm.controls['name'].setValue(user.name);
      this.newUserForm.controls['idParking'].setValue(user.idParking);
      this.isEdit = true;
    });
  }

  get Roles() {
    return this.userService.roles;
  }

  private createForm() {
    return this.formBuilder.group({
      name: [this.userService.newUser.name, [Validators.required]],
      last_name: [this.userService.newUser.last_name, [Validators.required]],
      email: [
        this.userService.newUser.email,
        [
          Validators.required,
          Validators.pattern(this.utilitiesService.getPatterEmail),
        ],
      ],
      user: [this.userService.newUser.user, [Validators.required]],
      password: [this.userService.newUser.password, [Validators.required]],
      role: [this.userService.newUser.role, [Validators.required]],
      idParking: [this.userService.newUser.idParking, [Validators.required]],
    });
  }

  getNewUserDataForm(): NewUserModel {
    return {
      email: this.newUserForm.controls['email'].value,
      last_name: this.newUserForm.controls['last_name'].value,
      name: this.newUserForm.controls['name'].value,
      password: this.newUserForm.controls['password'].value,
      role: '6ededbe2-d712-42c5-b82a-06d2ddf1b2d2',
      user: this.newUserForm.controls['user'].value,
    };
  }

  saveNewUser() {
    this.messageServices.showLoading();
    console.log(this.isEdit);
    if (this.isEdit) {
      this.userService
        .editUser(this.getNewUserDataForm())
        .toPromise()
        .then((data) => {
          if (data.success) {
            this.messageServices.OkTimeOut('Guardado');
            this.cleanForm();
          } else {
            this.messageServices.error('', data.message);
          }

          this.isEdit = false;
        });
    } else {
      this.userService
        .saveNewUser(this.getNewUserDataForm())
        .toPromise()
        .then((data) => {
          if (data.success) {
            this.messageServices.OkTimeOut('Guardado');
          } else {
            this.messageServices.error('', data.message);
          }
          this.userService.getAdminsByParking();
        })
        .then(() => {
          this.userService.getAdminsByParking();
        });
    }
  }

  cleanForm() {
    this.newUserForm.controls['email'].setValue('');
    this.newUserForm.controls['last_name'].setValue('');
    this.newUserForm.controls['name'].setValue('');
    this.newUserForm.controls['password'].setValue('');
    this.newUserForm.controls['role'].setValue('');
    this.newUserForm.controls['user'].setValue('');
    this.utilitiesService.markAsUnTouched(this.newUserForm);
    this.isEdit = false;
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.newUserForm, control);
  }
}