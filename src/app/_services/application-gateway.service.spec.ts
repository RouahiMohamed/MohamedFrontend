import { TestBed } from '@angular/core/testing';

import { ApplicationGatewayService } from './application-gateway.service';

describe('ApplicationGatewayService', () => {
  let service: ApplicationGatewayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplicationGatewayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
