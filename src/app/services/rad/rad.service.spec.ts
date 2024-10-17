import { TestBed } from '@angular/core/testing';

import { RadService } from './rad.service';

describe('RadService', () => {
  let service: RadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
