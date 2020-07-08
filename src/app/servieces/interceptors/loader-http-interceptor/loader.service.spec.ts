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

  it('should show()', async () => {
    service.show();
    expect(service.isLoading).toBeTruthy();
  });

  it('should hide()', async () => {
    service.hide();
    expect(service.isLoading).toBeFalsy();
  });
});
