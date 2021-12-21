import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkbox-container',
  templateUrl: './checkbox-container.component.html',
  styleUrls: ['./checkbox-container.component.css']
})
export class CheckboxContainerComponent implements OnInit {
  @Input() name!: string;
  @Input() controlName!: string;
  @Input() formGroup!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

}
