import {Component, Input} from '@angular/core'
import { ControlContainer, FormGroup, FormGroupDirective, UntypedFormGroup } from '@angular/forms'
import {UtilitiesService} from '../../services/utilities.service'

@Component({
  selector: 'app-select-container',
  templateUrl: './select-container.component.html',
  styleUrls: ['./select-container.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})
export class SelectContainerComponent {
  @Input() name!: string
  @Input() controlName!: string
  @Input() formGroup!: UntypedFormGroup | FormGroup
  @Input() data: any = []
  @Input() unselect: boolean = false

  constructor(private utilitiesService: UtilitiesService) {
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.formGroup, control)
  }
}
