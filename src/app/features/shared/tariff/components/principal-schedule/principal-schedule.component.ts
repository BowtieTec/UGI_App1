import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UtilitiesService } from '../../../../../shared/services/utilities.service'

@Component({
  selector: 'app-principal-schedule',
  templateUrl: './principal-schedule.component.html',
  styleUrls: ['./principal-schedule.component.css']
})
export class PrincipalScheduleComponent implements OnInit {
  @Input() holidayForm!: FormGroup
  @Input() timeRange!: number

  constructor(private utilitiesService: UtilitiesService) {}

  ngOnInit(): void {}

  validateHolidayForm(control: string) {
    return this.utilitiesService.controlInvalid(this.holidayForm, control)
  }
}
