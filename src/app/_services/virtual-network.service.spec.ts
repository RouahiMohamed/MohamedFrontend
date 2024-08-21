import { TestBed } from '@angular/core/testing';

import { VirtualNetworkService } from './virtual-network.service';

describe('VirtualNetworkService', () => {
  let service: VirtualNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
