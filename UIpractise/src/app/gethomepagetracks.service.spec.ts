import { TestBed } from '@angular/core/testing';

import { GethomepagetracksService } from './gethomepagetracks.service';

describe('GethomepagetracksService', () => {
  let service: GethomepagetracksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GethomepagetracksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
