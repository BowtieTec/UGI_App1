import {Component} from '@angular/core'
import {Observable} from 'rxjs'
import {AuthService} from '../services/auth.service'
import {ParkingAuthModel} from '../model/UserResponse.model'
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-location-panel',
  templateUrl: './location-panel.component.html',
  styleUrls: ['./location-panel.component.css']
})
export class LocationPanelComponent {
  path: string = environment.path
  date: Date = new Date()
  urlLogo: string = ''
  time = new Observable<string>((observer) => {
    setInterval(() => observer.next(new Date().toString()), 1000)
  })
  parking: ParkingAuthModel = this.auth.getParking()

  constructor(private auth: AuthService) {
    if (this.parking.url_logo) {
      this.urlLogo = `${this.path}logo/${this.parking.url_logo.split('/logo/')[1]}`
    } else {
      this.urlLogo = `./assets/img/parking.jpg`
    }


  }
}
