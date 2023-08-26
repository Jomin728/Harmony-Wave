import { TestBed } from '@angular/core/testing';

import { MyplaylistsService } from './myplaylists.service';

describe('MyplaylistsService', () => {
  let service: MyplaylistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyplaylistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
