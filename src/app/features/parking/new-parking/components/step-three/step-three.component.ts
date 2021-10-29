import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.css'],
})
export class StepThreeComponent implements OnInit {
  @Input() stepOneForm!: FormGroup;
  @Output() changeStep = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  emmitStep(number: number) {
    this.changeStep.emit(number);
  }
}
