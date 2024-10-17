import { TestBed } from '@angular/core/testing';

import { CreditCommitteeService } from './credit-committee.service';

describe('CreditCommitteeService', () => {
  let service: CreditCommitteeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCommitteeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
