import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashOutReportComponent } from './cash-out-report.component';

describe('CashOutReportComponent', () => {
  let component: CashOutReportComponent;
  let fixture: ComponentFixture<CashOutReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashOutReportComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashOutReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
