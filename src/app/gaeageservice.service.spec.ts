import { TestBed } from '@angular/core/testing';

import { GaeageserviceService } from './gaeageservice.service';

describe('GaeageserviceService', () => {
  let service: GaeageserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaeageserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
