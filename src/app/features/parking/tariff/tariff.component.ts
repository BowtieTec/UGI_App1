import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css'],
})
export class TariffComponent implements OnInit {
  timeRange: number = 1;
  costType: number = 1;
  disableRanges: boolean = false;

  ngOnInit(): void {}

  saveRule() {}
}
