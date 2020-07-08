import { TestBed, async } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { Component } from '@angular/core';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('should hide()', () => {
  //   service.hide();
  //   expect(service.isLoading).toBeFalsy();
  // });

  it('should show()', () => {
    service.show();
    expect(service.isLoading).toBeTruthy();
  });
});
