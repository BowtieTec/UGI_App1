import {Component, Input, OnInit} from '@angular/core'
import {UntypedFormGroup} from '@angular/forms'

@Component({
  selector: 'app-days-of-week',
  templateUrl: './days-of-week.component.html',
  styleUrls: ['./days-of-week.component.css']
})
export class DaysOfWeekComponent implements OnInit {
  @Input() daysSelectedForm!: UntypedFormGroup

  constructor() {
  }

  ngOnInit(): void {
  }
}
