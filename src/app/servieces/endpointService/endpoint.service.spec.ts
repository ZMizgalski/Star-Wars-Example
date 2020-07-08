import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EndpointService } from './endpoint.service';
import { HttpClient } from '@angular/common/http';

describe('EndpointService', () => {
  let service: EndpointService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EndpointService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reach getItemDetails(category: string, id: number) endpoint', async () => {
    const category = 'species';
    const id = 1;
    const object = <any>{};

    service.getItemDetails(category, id).subscribe(emp => {
      expect(emp).toEqual(object);
    });
  });

  it('should reach getItemsByCategory(category: string) endpoint', async () => {
    const category = 'species';
    const object = <any>{};

    service.getItemsByCategory(object).subscribe(emp => {
      expect(emp).toEqual(object);
      //
    });
  });
});
