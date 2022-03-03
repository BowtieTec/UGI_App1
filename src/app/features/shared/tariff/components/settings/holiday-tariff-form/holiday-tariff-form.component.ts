import { Component, Input, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../../../../shared/services/utilities.service'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-holiday-tariff-form',
  templateUrl: './holiday-tariff-form.component.html',
  styleUrls: ['./holiday-tariff-form.component.css']
})
export class HolidayTariffFormComponent implements OnInit {
  @Input() holidayForm!: FormGroup
  @Input() disableRanges!: boolean
  @Input() timeRange!: number

  constructor(private utilitiesService: UtilitiesService) {}

  ngOnInit(): void {}

  validateHolidayForm(control: string) {
    return this.utilitiesService.controlInvalid(this.holidayForm, control)
  }
}
