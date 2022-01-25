import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingMontlyReportComponent } from './parking-montly-report.component';

describe('ParkingMontlyReportComponent', () => {
  let component: ParkingMontlyReportComponent;
  let fixture: ComponentFixture<ParkingMontlyReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingMontlyReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingMontlyReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
