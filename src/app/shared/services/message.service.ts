import {Injectable} from '@angular/core'
import Swal from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  loading = false
  footer =
    '<div class="text-center"> <bold> Si el problema persiste, por favor comunicarse con el administrador o enviar un mensaje usando la opción de soporte indicando el error.</bold> </div>'

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
      showConfirmButton: true
    })
  }

  info(text: string, title = '') {
    this.hideLoading()
    Swal.fire({
      icon: 'info',
      title,
      text,
      showConfirmButton: true
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

  get nowTimeFormat() {
    const now = new Date()
    return `${now.getFullYear()}-${(now.getMonth() + 1 < 10 ? '0' : '')}${now.getMonth() + 1}-${(now.getDate() < 10 ? '0' : '')}${now.getDate()}T23:59`
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

  async areYouSureWithCancelAndInput(
    title: string,
    denyButtonText: string,
    confirmButtonText: string,
    output?: Date
  ) {
    return Swal.fire({
      denyButtonColor: '#415ba1',
      confirmButtonColor: '#05ccae',
      title,
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: true,
      allowOutsideClick: false,
      denyButtonText,
      confirmButtonText,
      html: `
        <div>
        <label class = ""
               style = "display: block;">Hora de salida</label>
        <input
          class = "inputClass"
          id='dateOut'
          name='dateOut'
          value='${output}'
          ngModel='${output}'
          max='${this.nowTimeFormat}'
          placeholder = 'Hora de salida'
          autocomplete = 'off'
          type = 'datetime-local'>

      </div>
      `
    }).then((result) => result)
  }
}
