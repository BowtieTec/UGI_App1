import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilitiesService } from '../../../shared/services/utilities.service';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.css'],
})
export class TariffComponent {
  timeRange: number = 1;
  costType: number = 1;
  disableRanges: boolean = false;
  holidayForm: FormGroup;
  rankForm: FormGroup;
  blockForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {
    this.holidayForm = this.createHolidayOrRankForm();
    this.rankForm = this.createHolidayOrRankForm();
    this.blockForm = this.createBlockForm();
  }

  saveRule() {
    return;
  }

  validateHolidayForm(control: string) {
    return this.utilitiesService.controlInvalid(this.holidayForm, control);
  }

  validateRankForm(control: string) {
    return this.utilitiesService.controlInvalid(this.rankForm, control);
  }

  validateBlockForm(control: string) {
    return this.utilitiesService.controlInvalid(this.blockForm, control);
  }

  createHolidayOrRankForm() {
    return this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
    });
  }

  createBlockForm() {
    return this.formBuilder.group({
      blockSize: ['', Validators.required],
    });
  }
}
