import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Films } from 'src/app/servieces/class/films/films';

@Component({
  selector: 'app-films-data',
  templateUrl: './films-data.component.html',
  styleUrls: ['./films-data.component.css'],
})
export class FilmsDataComponent implements OnInit {
  films!: Films;
  loaded = false;

  id: any;
  // Linked Inf
  specInf?: string;
  homeInf?: string;

  // clean arrays
  planetsRoutes: string[] = [];
  shipsRoutes: string[] = [];
  vehiclesRoutes: string[] = [];

  constructor(private route: ActivatedRoute, private end: EndpointService, private router: Router) {
    console.log(this.router.url);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.end.getFilmById(this.id).subscribe(data => {
      this.films = data;

      if (this.films.planets.length > 0) {
        for (let i = 0; i < this.films.planets.length; i++) {
          const path = this.films.planets[i];
          const result = path.split('/');
          this.planetsRoutes.push(
            result[result.length - 3] + '/' + result[result.length - 2] + '/'
          );
        }
        // console.log(this.filmsRoutes)
      }

      if (this.films.starships.length > 0) {
        for (let i = 0; i < this.films.starships.length; i++) {
          const path = this.films.starships[i];
          const result = path.split('/');
          this.shipsRoutes.push(result[result.length - 3] + '/' + result[result.length - 2] + '/');
        }
        // console.log(this.shipsRoutes)
      }

      if (this.films.vehicles.length > 0) {
        for (let i = 0; i < this.films.vehicles.length; i++) {
          const path = this.films.vehicles[i];
          const result = path.split('/');
          this.vehiclesRoutes.push(
            result[result.length - 3] + '/' + result[result.length - 2] + '/'
          );
        }
      }
      this.loaded = true;
    });
  }
}
