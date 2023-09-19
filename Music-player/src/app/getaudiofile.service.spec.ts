import { TestBed } from '@angular/core/testing';

import { GetaudiofileService } from './getaudiofile.service';

describe('GetaudiofileService', () => {
  let service: GetaudiofileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetaudiofileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
