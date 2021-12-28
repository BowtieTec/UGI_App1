import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  loading: boolean = false;
  footer: string =
    '<div class="text-center"> <bold> Si el problema persiste, por favor comunicarse con el administrador.</bold> </div>';

  showLoading() {
    this.loading = true;
  }

  hideLoading() {
    this.loading = false;
  }

  uncontrolledError(text: string = 'Error no controlado') {
    this.hideLoading();
    Swal.fire({
      icon: 'error',
      text,
      title: 'Error no controlado',
      footer: this.footer,
    });
  }

  error(title: string = '', text: string = '', footer: string = '') {
    this.hideLoading();
    Swal.fire({
      icon: 'error',
      title,
      text,
      footer: this.footer,
    });
  }

  warning(text: string, title: string = '!Cuidado!') {
    this.hideLoading();
    Swal.fire({
      icon: 'warning',
      title,
      text,
      footer: this.footer,
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
      footer: this.footer,
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

  async areYouSure(
    title: string,
    confirmButtonText: string = 'Si',
    denyButtonText: string = 'No'
  ) {
    return Swal.fire({
      title,
      showDenyButton: true,
      confirmButtonText,
      denyButtonText,
    }).then((result) => result);
  }

  async areYouSureWithCancel(
    title: string,
    confirmButtonText: string = 'Si',
    denyButtonText: string = 'No'
  ) {
    return Swal.fire({
      title,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText,
      denyButtonText,
    }).then((result) => result);
  }
}
