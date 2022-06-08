import {Component, Input, OnInit} from '@angular/core'
import {UntypedFormGroup} from '@angular/forms'
import {UtilitiesService} from '../../../../../shared/services/utilities.service'

@Component({
  selector: 'app-tariff-general-data',
  templateUrl: './tariff-general-data.component.html',
  styleUrls: ['./tariff-general-data.component.css']
})
export class TariffGeneralDataComponent implements OnInit {
  @Input() generalDataForm!: UntypedFormGroup

  constructor(private utilitiesService: UtilitiesService) {
  }

  ngOnInit(): void {
  }

  validateGeneralDataForm(control: string) {
    return this.utilitiesService.controlInvalid(this.generalDataForm, control)
  }
}
