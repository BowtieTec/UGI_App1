import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class MessageService {
  loading: boolean = false;
  constructor() {}

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }

  error(title: string = '', text: string = '', footer: string = '') {
    this.hideLoading();
    Swal.fire({
      icon: 'error',
      title,
      text,
      footer,
    });
  }

  warning(text: string, title: string = '!Cuidado!') {
    this.hideLoading();
    Swal.fire({
      icon: 'warning',
      title,
      text,
    });
  }

  warningTimeOut(text: string = '', title: string = '!Cuidado!') {
    this.hideLoading();
    Swal.fire({
      icon: 'warning',
      title,
      text,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  errorTimeOut(title: string = '', text: string = '', footer: string = '') {
    this.hideLoading();
    Swal.fire({
      icon: 'error',
      title,
      text,
      footer,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  Ok(title: string = 'Finalizado') {
    this.hideLoading();
    Swal.fire({
      icon: 'success',
      title,
    });
  }

  OkTimeOut(title: string = 'Finalizado') {
    this.hideLoading();
    Swal.fire({
      icon: 'success',
      title,
      timer: 1000,
      showConfirmButton: false,
    });
  }

  infoTimeOut(text: string, title: string = '') {
    this.hideLoading();
    Swal.fire({
      icon: 'info',
      title,
      text,
      timer: 3000,
      showConfirmButton: false,
    });
  }

  info(text: string, title: string = '') {
    this.hideLoading();
    Swal.fire({
      icon: 'info',
      title,
      text,
      showConfirmButton: false,
    });
  }
}
