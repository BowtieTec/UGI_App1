import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { UtilitiesService } from '../../../../../../shared/services/utilities.service'

@Component({
  selector: 'app-blocks-tariff-form',
  templateUrl: './blocks-tariff-form.component.html',
  styleUrls: ['./blocks-tariff-form.component.css']
})
export class BlocksTariffFormComponent implements OnInit {
  @Input() blockForm!: FormGroup
  @Input() timeRange!: number

  constructor(private utilitiesService: UtilitiesService) {}

  validateBlockForm(control: string) {
    return this.utilitiesService.controlInvalid(this.blockForm, control)
  }

  ngOnInit(): void {}
}
