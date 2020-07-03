import { TestBed } from '@angular/core/testing';

import { RouteHolderService } from './route-holder.service';

describe('RouteHolderService', () => {
  let service: RouteHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
