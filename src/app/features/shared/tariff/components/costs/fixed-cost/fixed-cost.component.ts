import { Component, Input, OnInit } from '@angular/core'
import { UtilitiesService } from '../../../../../../shared/services/utilities.service'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-fixed-cost',
  templateUrl: './fixed-cost.component.html',
  styleUrls: ['./fixed-cost.component.css']
})
export class FixedCostComponent implements OnInit {
  @Input() costType!: number
  @Input() fixedCostForm!: FormGroup

  constructor(private utilitiesService: UtilitiesService) {}

  validateFixedCost(control: string) {
    return this.utilitiesService.controlInvalid(this.fixedCostForm, control)
  }

  ngOnInit(): void {}
}
