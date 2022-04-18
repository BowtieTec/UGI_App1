import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dayli-tariff',
  templateUrl: './dayli-tariff.component.html',
  styleUrls: ['./dayli-tariff.component.css']
})
export class DayliTariffComponent implements OnInit {
  @Input() daysSelectedForm!: FormGroup

  constructor() {
  }

  ngOnInit(): void {
  }

}
