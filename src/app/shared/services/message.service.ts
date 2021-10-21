import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private router: Router) {}

  showLoading() {
    Swal.showLoading();
  }

  hideLoading() {
    Swal.close();
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
