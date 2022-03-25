import { Component, Input } from '@angular/core'
import { ControlContainer, FormGroup, FormGroupDirective } from '@angular/forms'
import { UtilitiesService } from '../../services/utilities.service'

@Component({
  selector: 'app-input-container',
  templateUrl: './input-container.component.html',
  styleUrls: ['./input-container.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class InputContainerComponent {
  @Input() name!: string
  @Input() controlName!: string
  @Input() formGroup!: FormGroup
  @Input() type = 'text'
  @Input() textInfo = ''
  @Input() readonly: boolean = false

  constructor(private utilitiesService: UtilitiesService) {}

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.formGroup, control)
  }
}
