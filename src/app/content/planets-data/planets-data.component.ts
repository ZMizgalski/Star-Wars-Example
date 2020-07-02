import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { ActivatedRoute } from '@angular/router';
import { Planets } from 'src/app/servieces/class/planets/planets';

@Component({
  selector: 'app-planets-data',
  templateUrl: './planets-data.component.html',
  styleUrls: ['./planets-data.component.css']
})
export class PlanetsDataComponent implements OnInit {

  id: any;
  planets!: Planets;
  loaded = false;
  // clean arrays
  pepoleRoutes: string[] = [];
  shipsRoutes: string[] = [];
  vehiclesRoutes: string[] = [];

  constructor(private route: ActivatedRoute, private end: EndpointService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.end.getPlanetById(this.id).subscribe(data => {

      this.planets = data;

      if (this.planets.residents.length > 0) {
        for (let i = 0; i < this.planets.residents.length; i++) {
          const path = this.planets.residents[i];
        const result = path.split("/")
        this.pepoleRoutes.push(result[result.length - 2] + "/");
        }
       // console.log(this.filmsRoutes)
      }

      if (this.planets.films.length > 0) {
        for (let i = 0; i < this.planets.films.length; i++) {
          const path = this.planets.films[i];
        const result = path.split("/")
        this.vehiclesRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
        // console.log(this.vehiclesRoutes)
      }
      this.loaded = true;
    })

  }

}
