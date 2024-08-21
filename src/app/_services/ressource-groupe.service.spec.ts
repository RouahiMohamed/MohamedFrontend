import { TestBed } from '@angular/core/testing';

import { RessourceGroupeService } from './ressource-groupe.service';

describe('RessourceGroupeService', () => {
  let service: RessourceGroupeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RessourceGroupeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
