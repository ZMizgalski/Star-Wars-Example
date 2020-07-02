import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EndpointService } from 'src/app/servieces/endpoint.service';

@Component({
  selector: 'app-character-data-spec',
  templateUrl: './character-data-spec.component.html',
  styleUrls: ['./character-data-spec.component.css']
})
export class CharacterDataSpecComponent implements OnInit {

  id: any;

  // Main Inf
  name: string;
  birth: string;
  species: any;
  home: any;
  gender: string;
  hair: string;
  skin: string;
  height: string;
  mass: string;

  // Linked Inf
  specInf: string;
  homeInf: string;

  // Endpoint After
  films: any;
  starS: any;
  vehicles: any;

  // clean arrays
  filmsRoutes = [];
  shipsRoutes = [];
  vehiclesRoutes = [];

  constructor(private route: ActivatedRoute, private end: EndpointService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.end.getPersonById(this.id).subscribe(data => {
       // console.log(data);
      this.name = data.name;
      this.birth = data.birth_year;
      this.gender = data.gender;
      this.hair = data.hair_color;
      this.skin = data.skin_color;
      this.height = data.height;
      this.mass = data.mass;
      this.home = data.homeworld;
      this.species = data.species;
      this.films = data.films;
      this.starS = data.starships;
      this.vehicles = data.vehicles;

      // console.log(this.films);
      // console.log(this.starS);
      // console.log(this.species.match(/\d+/)[0]);



      if (this.films.length > 0) {
        for (let i = 0; i < this.films.length; i++) {
          const path = this.films[i];
        const result = path.split("/")
        this.filmsRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
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



      if (this.home.length > 0) {
        const result = this.home.split("/")
        // console.log(result[result.length - 2]);
        this.end.getPlanetById(result[result.length - 2]).subscribe(data => {
          this.homeInf = data.name;
         // console.log(data);
        })
      }

      if (this.species.length > 0) {
        const result = this.home.split("/")
        // console.log(result[result.length - 2]);
      this.end.getSpeciesById(result[result.length - 2]).subscribe(data => {
        this.specInf = data.name;
       // console.log(data);
      })
    }

      //console.log(data);
    })

  }

}
