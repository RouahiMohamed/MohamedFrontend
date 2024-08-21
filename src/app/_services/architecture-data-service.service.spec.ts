import { TestBed } from '@angular/core/testing';

import { ArchitectureDataServiceService } from './architecture-data-service.service';

describe('ArchitectureDataServiceService', () => {
  let service: ArchitectureDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchitectureDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
