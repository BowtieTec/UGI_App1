import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';
import { AuthModel } from '../model/UserResponse.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  authData: AuthModel = this.auth.getUser();

  constructor(
    private auth: AuthService,
    private route: Router,
    private messageService: MessageService
  ) {}

  logout() {
    this.auth.cleanUser();
    this.messageService.showLoading();
    this.route.navigate(['/']).then(() => {
      this.messageService.OkTimeOut('Sesión cerrada');
    });
  }
}
