import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EndpointService {
  domain: string;

  constructor(private http: HttpClient) {
    this.domain = 'https://swapi.dev/api/';
  }

  getAllcategories(): Observable<any> {
    return this.http.get(this.domain);
  }

  getItemsByCategory(category: string): Observable<any> {
    return this.http.get(this.domain + category + '/');
  }

  getItemDetails(category: string, id: number): Observable<any> {
    return this.http.get(this.domain + category + '/' + id + '/');
  }
}
