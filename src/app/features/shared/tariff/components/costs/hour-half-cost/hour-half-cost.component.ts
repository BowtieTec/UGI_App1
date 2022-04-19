import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UtilitiesService } from '../../../../../../shared/services/utilities.service'

@Component({
  selector: 'app-hour-half-cost',
  templateUrl: './hour-half-cost.component.html',
  styleUrls: ['./hour-half-cost.component.css']
})
export class HourHalfCostComponent implements OnInit {
  @Input() costType!: number
  @Input() hourAHalfForm!: FormGroup
  @Input() settingValues!: any

  constructor(private utilitiesService: UtilitiesService) {
  }

  get isHourReadOnly() {
    const isHourReadOnly: boolean = ((this.settingValues.hourUpperLimit - this.settingValues.hourLowerLimit) <= 0)
    if (isHourReadOnly) {
      this.hourAHalfForm.get('hourCost')?.setValue(0)
      return false
    }


    return true
  }

  ngOnInit(): void {

  }

  validateHourHalfCost(control: string) {
    return this.utilitiesService.controlInvalid(this.hourAHalfForm, control)
  }
}
