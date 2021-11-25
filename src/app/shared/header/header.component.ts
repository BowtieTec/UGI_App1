import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private auth: AuthService,
    private rooute: Router,
    private messageService: MessageService
  ) {}

  logout() {
    this.auth.cleanUser();
    this.messageService.showLoading();
    this.rooute.navigate(['/']).then(() => {
      this.messageService.OkTimeOut('Sesión cerrada');
    });
  }
}
