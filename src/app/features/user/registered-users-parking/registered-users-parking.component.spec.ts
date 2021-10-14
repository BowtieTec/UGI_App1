import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUsersParkingComponent } from './registered-users-parking.component';

describe('RegisteredUsersParkingComponent', () => {
  let component: RegisteredUsersParkingComponent;
  let fixture: ComponentFixture<RegisteredUsersParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredUsersParkingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredUsersParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
