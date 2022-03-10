import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPublicFormComponent } from './register-public-form.component';

describe('RegisterPublicFormComponent', () => {
  let component: RegisterPublicFormComponent;
  let fixture: ComponentFixture<RegisterPublicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPublicFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPublicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
