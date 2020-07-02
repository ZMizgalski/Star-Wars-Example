import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-planets-data',
  templateUrl: './planets-data.component.html',
  styleUrls: ['./planets-data.component.css']
})
export class PlanetsDataComponent implements OnInit {

  id: any;

  // Main Inf
  name: string;
  climate: string;
  species: any;
  residents: any;
  diameter: string;
  gravity: string;
  orb: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;

  // Linked Inf
  specInf: string;
  homeInf: string;

  // Endpoint After
  starS: any;
  films: any;

  // clean arrays
  pepoleRoutes = [];
  shipsRoutes = [];
  vehiclesRoutes = [];

  constructor(private route: ActivatedRoute, private end: EndpointService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.end.getPlanetById(this.id).subscribe(data => {
     //  console.log(data);
      this.name = data.name;
      this.climate = data.climate;
      this.diameter = data.diameter;
      this.gravity = data.gravity;
      this.orb = data.orbital_period;
      this.population = data.population;
      this.rotation_period = data.rotation_period;
      this.surface_water = data.surface_water;
      this.terrain = data.terrain;
      // console.log(this.terrain);


      this.residents = data.residents;
      this.films = data.films;


      if (this.residents.length > 0) {
        for (let i = 0; i < this.residents.length; i++) {
          const path = this.residents[i];
        const result = path.split("/")
        this.pepoleRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
       // console.log(this.filmsRoutes)
      }

      if (this.films.length > 0) {
        for (let i = 0; i < this.films.length; i++) {
          const path = this.films[i];
        const result = path.split("/")
        this.vehiclesRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
        // console.log(this.vehiclesRoutes)
      }
    })

  }

}
