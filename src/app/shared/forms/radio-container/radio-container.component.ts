import { Component, Input, OnInit } from '@angular/core'
import { UtilitiesService } from '../../services/utilities.service'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-radio-container',
  templateUrl: './radio-container.component.html',
  styleUrls: ['./radio-container.component.css']
})
export class RadioContainerComponent implements OnInit {
  @Input() desc!: string
  @Input() controlName!: string
  @Input() value!: number
  @Input() formGroup!: FormGroup
  @Input() isChecked = false
  @Input() readOnly = false
  randomString: string = this.utilitiesService.randomString()

  constructor(private utilitiesService: UtilitiesService) {
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.formGroup, control)
  }

  ngOnInit(): void {
  }
}
