import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormGroup} from "@angular/forms";

@Component({
  selector: 'app-dayli-tariff',
  templateUrl: './dayli-tariff.component.html',
  styleUrls: ['./dayli-tariff.component.css']
})
export class DayliTariffComponent implements OnInit {
  @Input() daysSelectedForm!: UntypedFormGroup

  constructor() {
  }

  ngOnInit(): void {
  }

}
