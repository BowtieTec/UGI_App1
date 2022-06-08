import {Component, Input, OnInit} from '@angular/core'
import {UtilitiesService} from '../../../../../../shared/services/utilities.service'
import {UntypedFormGroup} from '@angular/forms'

@Component({
  selector: 'app-schedule-ranks-tariff-form',
  templateUrl: './schedule-ranks-tariff-form.component.html',
  styleUrls: ['./schedule-ranks-tariff-form.component.css']
})
export class ScheduleRanksTariffFormComponent implements OnInit {
  @Input() rankForm!: UntypedFormGroup
  @Input() timeRange!: number

  constructor(private utilitiesService: UtilitiesService) {}

  ngOnInit(): void {}

  validateRankForm(control: string) {
    return this.utilitiesService.controlInvalid(this.rankForm, control)
  }
}
