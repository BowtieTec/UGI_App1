import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFiveComponent } from './step-five.component';

describe('StepFiveComponent', () => {
  let component: StepFiveComponent;
  let fixture: ComponentFixture<StepFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
