import { TestBed } from '@angular/core/testing';

import { RegisterPublicFormService } from './register-public-form.service';

describe('RegisterPublicFormService', () => {
  let service: RegisterPublicFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterPublicFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
