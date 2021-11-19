import { Component, OnInit } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css'],
})
export class TariffComponent implements OnInit {
  timeRange: number = 1;
  costType: number = 1;
  fromDate!: NgbDate | null;
  toDate!: NgbDate | null;
  hoveredDate: NgbDate | null = null;

  constructor(
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {}

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
