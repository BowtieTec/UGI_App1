import { Injectable } from '@angular/core'
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  loading = false
  footer =
    '<div class="text-center"> <bold> Si el problema persiste, por favor comunicarse con el administrador.</bold> </div>'

  showLoading() {
    this.loading = true
  }

  hideLoading() {
    this.loading = false
  }

  uncontrolledError(text = 'Error no controlado') {
    this.hideLoading()
    Swal.fire({
      icon: 'error',
      text,
      title: 'Error no controlado',
      footer: this.footer
    })
  }

  error(title = '', text = '', footer = '') {
    this.hideLoading()
    Swal.fire({
      icon: 'error',
      title,
      text,
      footer: this.footer
    })
  }

  warning(text: string, title = '!Cuidado!') {
    this.hideLoading()
    Swal.fire({
      icon: 'warning',
      title,
      text,
      footer: this.footer
    })
  }

  warningTimeOut(text = '', title = '!Cuidado!') {
    this.hideLoading()
    Swal.fire({
      icon: 'warning',
      title,
      text,
      timer: 2000,
      showConfirmButton: false,
      footer: this.footer
    })
  }

  errorTimeOut(title = '', text = '', footer = '') {
    this.hideLoading()
    Swal.fire({
      icon: 'error',
      title,
      text,
      footer,
      timer: 2000,
      showConfirmButton: false
    })
  }

  Ok(title = 'Finalizado') {
    this.hideLoading()
    Swal.fire({
      icon: 'success',
      title
    })
  }

  OkTimeOut(title = 'Finalizado') {
    this.hideLoading()
    Swal.fire({
      icon: 'success',
      title,
      timer: 1000,
      showConfirmButton: false
    })
  }

  infoTimeOut(text: string, title = '') {
    this.hideLoading()
    Swal.fire({
      icon: 'info',
      title,
      text,
      timer: 3000,
      showConfirmButton: false
    })
  }

  info(text: string, title = '') {
    this.hideLoading()
    Swal.fire({
      icon: 'info',
      title,
      text,
      showConfirmButton: false
    })
  }

  async areYouSure(
    title: string,
    confirmButtonText = 'Si',
    denyButtonText = 'No'
  ) {
    return Swal.fire({
      title,
      showDenyButton: true,
      confirmButtonText,
      denyButtonText
    }).then((result) => result)
  }

  async areYouSureWithCancel(
    title: string,
    confirmButtonText = 'Si',
    denyButtonText = 'No'
  ) {
    return Swal.fire({
      confirmButtonColor: '#05ccae',
      denyButtonColor: '#415ba1',
      title,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText,
      denyButtonText
    }).then((result) => result)
  }
}
