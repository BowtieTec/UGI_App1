import { Pipe, PipeTransform } from '@angular/core';
import {CourtesyModel} from "../../features/courtesy/models/Courtesy.model";
import {CurrencyPipe} from "@angular/common";

@Pipe({
  name: 'courtesyValue'
})
export class CourtesyValuePipe implements PipeTransform {
constructor(private currencyPipe: CurrencyPipe) {}
  transform(value: any, courtesy: CourtesyModel): unknown {
    console.log(value);
    if (courtesy.type == 1) {
      return `${value}%`;
    } else {
      return this.currencyPipe.transform(value, 'GTQ', 'Q');
    }
  }
}
