import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserParkingComponent } from './new-user-parking.component';

describe('NewUserParkingComponent', () => {
  let component: NewUserParkingComponent;
  let fixture: ComponentFixture<NewUserParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewUserParkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
