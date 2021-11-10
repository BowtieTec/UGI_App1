import { Component, Input, OnInit } from '@angular/core';
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

  get Roles() {
    return this.userService.roles;
  }

  ngOnInit(): void {
    this.subject.subscribe((user: NewUserModel) => {
      console.log(user);
      if (user.name.length > 0) {
        this.newUserForm.controls['name'].setValue(user.name);
        this.newUserForm.controls['last_name'].setValue(user.last_name);
        this.newUserForm.controls['email'].setValue(user.email);
        this.newUserForm.controls['user'].setValue(user.user);
        this.newUserForm.controls['password'].setValue(
          'EstaPuedeOnoSerLaContraseña'
        );
        this.newUserForm.controls['role'].setValue(user.role);
        this.newUserForm.controls['name'].setValue(user.name);
        this.newUserForm.controls['idParking'].setValue(user.idParking);
        this.newUserForm.controls['id'].setValue(user.id);
        this.isEdit = true;
      }
    });
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
    };
  }

  saveNewUser() {
    this.messageServices.showLoading();
    if (this.isEdit) {
      console.log(this.getNewUserDataForm());
      this.userService
        .editUser(this.getNewUserDataForm())
        .toPromise()
        .then((data) => {
          if (data.success) {
            this.cleanForm();
            this.messageServices.OkTimeOut('Guardado');
          } else {
            this.messageServices.error('', data.message);
          }
          this.subject.next(new NewUserModel());
        });
    } else {
      this.userService
        .saveNewUser(this.getNewUserDataForm())
        .toPromise()
        .then((data) => {
          if (data.success) {
            this.cleanForm();
            this.messageServices.OkTimeOut('Guardado');
          } else {
            this.messageServices.error('', data.message);
          }
          this.cleanForm();
          this.isEdit = false;
        })
        .then(() => {
          this.cleanForm();
          this.subject.next(new NewUserModel());
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

  private createForm() {
    return this.formBuilder.group({
      id: [''],
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
}
