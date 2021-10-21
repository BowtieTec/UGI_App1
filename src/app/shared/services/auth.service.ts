import { Injectable } from '@angular/core';
import { UserRequestModel } from '../model/UserRequest.model';
import { HttpClient } from '@angular/common/http';
import { AuthModel, UserResponseModel } from '../model/UserResponse.model';
import { environment } from '../../../environments/environment';
import { MessageService } from './message.service';
import { EncryptionService } from './encryption.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.serverAPI;

  constructor(
    private http: HttpClient,
    private message: MessageService,
    private crypto: EncryptionService,
    private route: Router
  ) {}

  saveUser(user: AuthModel) {
    localStorage.setItem(
      this.crypto.encryptKey('User'),
      this.crypto.encrypt(JSON.stringify(user).replace('/n', ''))
    );
  }

  getUser(): AuthModel {
    const sentence = localStorage.getItem(this.crypto.encryptKey('User'));
    return {
      ...JSON.parse(this.crypto.decrypt(sentence!)),
    };
  }

  login(login: UserRequestModel) {
    this.message.showLoading();
    this.http
      .post<UserResponseModel>(`${this.apiUrl}backoffice/admin/signin`, login)
      .subscribe((data) => {
        this.saveUser(data.data);
        this.message.OkTimeOut('!Listo!');
        this.route.navigate(['/home/dashboard']);
      });
  }
}
