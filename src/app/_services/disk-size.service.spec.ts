import { TestBed } from '@angular/core/testing';

import { DiskSizeService } from './disk-size.service';

describe('DiskSizeService', () => {
  let service: DiskSizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiskSizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
