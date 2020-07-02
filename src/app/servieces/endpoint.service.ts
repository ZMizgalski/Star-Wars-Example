import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  domain: string;

  constructor(private http: HttpClient) {
    this.domain = "https://swapi.dev/api/"
   }
   getFilmsById(id:  any): Observable<any> {
    return this.http.get(this.domain + 'films/' + id + '/');
  }

  getPepole(): Observable<any> {
    return this.http.get(this.domain + 'people/');
  }

  getFilms(): Observable<any> {
    return this.http.get(this.domain + 'films/');
  }

  getStarships(): Observable<any> {
    return this.http.get(this.domain + 'starships/');
  }

  getVehicles(): Observable<any> {
    return this.http.get(this.domain + 'vehicles/');
  }

  getSpecies(): Observable<any> {
    return this.http.get(this.domain + 'species/');
  }

  getPlanets(): Observable<any> {
    return this.http.get(this.domain + 'planets/');
  }

  getPersonById(id:  any): Observable<any> {
    return this.http.get(this.domain + 'people/' + id + '/');
  }

  getFilmById(id:  any): Observable<any> {
    return this.http.get(this.domain + 'films/' + id + '/');
  }

  getPlanetById(id: any): Observable<any> {
    return this.http.get(this.domain + 'planets/' + id + '/');
  }

  getSpeciesById(id:  any): Observable<any> {
    return this.http.get(this.domain + 'species/' + id + '/');
  }

  getStarShipsById(id:  any): Observable<any> {
    return this.http.get(this.domain + 'starships/' + id + '/');
  }

  getVehiclesById(id:  any): Observable<any> {
    return this.http.get(this.domain + 'vehicles/' + id + '/');
  }

}
