import { TestBed } from '@angular/core/testing';

import { VmssService } from './vmss.service';

describe('VmssService', () => {
  let service: VmssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VmssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
