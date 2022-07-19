import {ComponentFixture, TestBed} from '@angular/core/testing'

import {ParkingMontlyPaymentReportComponent} from './parking-montly-payment-report.component'

describe('ParkingMontlyReportComponent', () => {
  let component: ParkingMontlyPaymentReportComponent
  let fixture: ComponentFixture<ParkingMontlyPaymentReportComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParkingMontlyPaymentReportComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingMontlyPaymentReportComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
