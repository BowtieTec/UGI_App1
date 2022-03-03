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

  constructor(private utilitiesService: UtilitiesService) {}

  ngOnInit(): void {}

  validateHourHalfCost(control: string) {
    return this.utilitiesService.controlInvalid(this.hourAHalfForm, control)
  }
}
