import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StationaryCourtesiesComponent} from './stationary-courtesies.component';

describe('StationaryCourtesiesComponent', () => {
  let component: StationaryCourtesiesComponent;
  let fixture: ComponentFixture<StationaryCourtesiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StationaryCourtesiesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StationaryCourtesiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
