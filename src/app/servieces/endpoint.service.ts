import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StarShip } from './class/star-ship/star-ship';
import { Vehicle } from './class/vehicles/vehicle';
import { People } from './class/pepole/people';
import { Species } from './class/species/species';
import { Planets } from './class/planets/planets';
import { Films } from './class/films/films';
import { VehiclesComponent } from '../content/vehicles/vehicles.component';
import { Page } from './class/page/page';

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

  getVehicles(): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.domain + 'vehicles/');
  }

  getSpecies(): Observable<Species> {
    return this.http.get<Species>(this.domain + 'species/');
  }

  getPlanets(): Observable<Planets> {
    return this.http.get<Planets>(this.domain + 'planets/');
  }

  getPersonById(id:  any): Observable<People> {
    return this.http.get<People>(this.domain + 'people/' + id + '/');
  }

  getFilmById(id:  any): Observable<Films> {
    return this.http.get<Films>(this.domain + 'films/' + id + '/');
  }

  getPlanetById(id: any): Observable<Planets> {
    return this.http.get<Planets>(this.domain + 'planets/' + id + '/');
  }

  getSpeciesById(id:  any): Observable<Species> {
    return this.http.get<Species>(this.domain + 'species/' + id + '/');
  }

  getStarShipsById(id:  any): Observable<StarShip> {
    return this.http.get<StarShip>(this.domain + 'starships/' + id + '/');
  }

  getVehiclesById(id:  any): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.domain + 'vehicles/' + id + '/');
  }

}
