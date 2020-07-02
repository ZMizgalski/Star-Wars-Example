import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndpointService } from 'src/app/servieces/endpoint.service';

@Component({
  selector: 'app-films-data',
  templateUrl: './films-data.component.html',
  styleUrls: ['./films-data.component.css']
})
export class FilmsDataComponent implements OnInit {

  id: any;

  // Main Inf
  title: string;
  director: string;
  species: any;
  planets: any;
  episode: string;
  created: string;
  producer: string;
  openingInf: string;

  // Linked Inf
  specInf: string;
  homeInf: string;

  // Endpoint After
  starS: any;
  vehicles: any;

  // clean arrays
  planetsRoutes = [];
  shipsRoutes = [];
  vehiclesRoutes = [];

  constructor(private route: ActivatedRoute, private end: EndpointService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.end.getFilmById(this.id).subscribe(data => {
     //  console.log(data);
      this.title = data.title;
      this.director = data.director;
      this.episode = data.episode_id;
      this.created = data.created;
      this.producer = data.producer;
      this.openingInf = data.opening_crawl;


      this.planets = data.planets;
      this.species = data.species;
      this.starS = data.starships;
      this.vehicles = data.vehicles;

      // console.log(this.films);
      // console.log(this.starS);
      // console.log(this.species.match(/\d+/)[0]);



      if (this.planets.length > 0) {
        for (let i = 0; i < this.planets.length; i++) {
          const path = this.planets[i];
        const result = path.split("/")
        this.planetsRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
       // console.log(this.filmsRoutes)
      }

      if (this.starS.length > 0) {
        for (let i = 0; i < this.starS.length; i++) {
          const path = this.starS[i];
        const result = path.split("/")
        this.shipsRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
       // console.log(this.shipsRoutes)
      }

      if (this.vehicles.length > 0) {
        for (let i = 0; i < this.vehicles.length; i++) {
          const path = this.vehicles[i];
        const result = path.split("/")
        this.vehiclesRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
        // console.log(this.vehiclesRoutes)
      }

/*

      if (this.planets.length > 0) {
        const result = this.planets.split("/")
        // console.log(result[result.length - 2]);
        this.end.getPlanetById(result[result.length - 2]).subscribe(data => {
          this.homeInf = data.name;
         // console.log(data);
        })
      }

      if (this.species.length > 0) {
        const result = this.planets.split("/")
        // console.log(result[result.length - 2]);
      this.end.getSpeciesById(result[result.length - 2]).subscribe(data => {
        this.specInf = data.name;
       // console.log(data);
      })
    }
    */

      //console.log(data);
    })

  }

}
