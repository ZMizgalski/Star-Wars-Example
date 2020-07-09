import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';
import { Subject } from 'rxjs';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should hide()', () => {
    service.hide();
    const loading = new Subject<boolean>();
    loading.next(false);
    expect(service.isLoading).toEqual(loading);
  });

  it('should show()', () => {
    service.hide();
    const loading = new Subject<boolean>();
    loading.next(true);
    expect(service.isLoading).toEqual(loading);
  });
});
