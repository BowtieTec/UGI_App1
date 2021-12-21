import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, FormGroupDirective} from "@angular/forms";
import {UtilitiesService} from "../../services/utilities.service";

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
export class InputContainerComponent implements OnInit {
@Input() name!: string;
@Input() controlName!: string;
@Input() formGroup!: FormGroup;
@Input() type: string = 'text';
  constructor(private utilitiesService: UtilitiesService) {
  }

  ngOnInit(): void {
  }

  controlInvalid(control: string): boolean {
    return this.utilitiesService.controlInvalid(this.formGroup, control);
  }

}
