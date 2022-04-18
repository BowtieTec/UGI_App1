import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DayliTariffComponent} from './dayli-tariff.component';

describe('DayliTariffComponent', () => {
  let component: DayliTariffComponent;
  let fixture: ComponentFixture<DayliTariffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DayliTariffComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayliTariffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
