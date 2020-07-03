import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { People } from 'src/app/servieces/class/pepole/people';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-character-data-spec',
  templateUrl: './character-data-spec.component.html',
  styleUrls: ['./character-data-spec.component.css']
})
export class CharacterDataSpecComponent implements OnInit {

  id: any;
  spec?: string;
  people!: People;
  // Linked Inf
  specInf: string[] = [];
  homeInf?: string;
  loaded = false;

  // clean arrays
  filmsRoutes: string[] = [];
  shipsRoutes: string[] = [];
  vehiclesRoutes: string[] = [];

  constructor(private route: ActivatedRoute, private end: EndpointService, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.end.getPersonById(this.id).subscribe(data => {

      this.people = data;

      if (this.people.films.length > 0) {
        for (let i = 0; i < this.people.films.length; i++) {
          const path = this.people.films[i];
        const result = path.split("/")
        this.filmsRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
       // console.log(this.filmsRoutes)
      }

      if (this.people.starships.length > 0) {
        for (let i = 0; i < this.people.starships.length; i++) {
          const path = this.people.starships[i];
        const result = path.split("/")
        this.shipsRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
       // console.log(this.shipsRoutes)
      }

      if (this.people.vehicles.length > 0) {
        for (let i = 0; i < this.people.vehicles.length; i++) {
          const path = this.people.vehicles[i];
        const result = path.split("/")
        this.vehiclesRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
      }



      if (this.people.homeworld.length > 0) {
        const result = this.people.homeworld.split("/")
        this.end.getPlanetById(result[result.length - 2]).subscribe(data => {
          this.homeInf = data.name;
        })
      }

      if (this.people.species.length > 0) {
        this.people.parsedSpecies = [];
        for(let i = 0; i < this.people.species.length; i++) {
          // console.log(this.people);


          const result = this.people.species[i].split("/")
          this.end.getSpeciesById(result[result.length - 2]).subscribe(data => {
          //  console.log(data.name);
          if (this.people.parsedSpecies) {
            const asd = <string>this.people.species[i];
            this.people.parsedSpecies.push({specification: data.name , url: asd });


            this.spec = this.people.parsedSpecies.map(({specification}) => specification)[0]
            // let url = this.people.parsedSpecies.map(({url}) => url)
             // console.log(url)
            console.log(this.spec);

          }
        })
        //console.log(this.specInf);
        }
    }
      this.loaded = true;
    })

  }

}
