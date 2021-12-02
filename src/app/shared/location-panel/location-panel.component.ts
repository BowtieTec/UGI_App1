import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {ParkingAuthModel} from "../model/UserResponse.model";

@Component({
  selector: 'app-location-panel',
  templateUrl: './location-panel.component.html',
  styleUrls: ['./location-panel.component.css']
})
export class LocationPanelComponent implements OnInit {
  date:Date = new Date();
  time = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });
  parking: ParkingAuthModel = this.auth.getParking();
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    console.log(this.parking);
  }


}
