import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../../../shared/services/utilities.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  newUserForm: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {
    this.newUserForm = this.createForm();
  }

  ngOnInit(): void {}

  get Roles() {
    return this.userService.roles;
  }

  private createForm() {
    return this.formBuilder.group({
      name: [this.userService.newUser.name, [Validators.required]],
      last_name: [this.userService.newUser.last_name, [Validators.required]],
      email: [this.userService.newUser.email, [Validators.required]],
      user: [this.userService.newUser.user, [Validators.required]],
      password: [this.userService.newUser.password, [Validators.required]],
      role: [this.userService.newUser.role, [Validators.required]],
      idParking: [this.userService.newUser.idParking, [Validators.required]],
    });
  }

  saveNewUser() {}

  cleanForm() {}

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.newUserForm, control);
  }
}
