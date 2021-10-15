import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor() {}

  showLoading() {
    Swal.showLoading();
  }

  hideLoading() {
    Swal.hideLoading();
  }

  error(title: string, text: string, footer: string = '') {
    Swal.fire({
      icon: 'error',
      title,
      text,
      footer,
    });
  }

  errorTimeOut(title: string, text: string, footer: string = '') {
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
    Swal.fire({
      icon: 'success',
      title,
    });
  }

  OkTimeOut(title: string = 'Finalizado') {
    Swal.fire({
      icon: 'success',
      title,
      timer: 1000,
      showConfirmButton: false,
    });
  }
}
