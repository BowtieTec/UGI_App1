import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css'],
})
export class RecoverPasswordComponent implements OnInit {
  step: number = 1;
  email: string = '';
  confirmationCode: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  ngOnInit(): void {}

  changeStep() {
    this.step++;
  }
}
