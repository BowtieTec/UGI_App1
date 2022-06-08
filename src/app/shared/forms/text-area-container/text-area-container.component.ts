import {Component, Input} from '@angular/core'
import {UntypedFormGroup} from '@angular/forms'
import {UtilitiesService} from '../../services/utilities.service'

@Component({
  selector: 'app-text-area-container',
  templateUrl: './text-area-container.component.html',
  styleUrls: ['./text-area-container.component.css']
})
export class TextAreaContainerComponent {
  @Input() name!: string
  @Input() controlName!: string
  @Input() formGroup!: UntypedFormGroup

  constructor(private utilitiesService: UtilitiesService) {
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.formGroup, control)
  }
}
