import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CourtesiesComponent} from './courtesies.component';

describe('CourtesiesComponent', () => {
  let component: CourtesiesComponent;
  let fixture: ComponentFixture<CourtesiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourtesiesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CourtesiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
