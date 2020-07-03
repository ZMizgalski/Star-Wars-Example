import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Species } from 'src/app/servieces/class/species/species';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';

@Component({
  selector: 'app-species-data',
  templateUrl: './species-data.component.html',
  styleUrls: ['./species-data.component.css']
})
export class SpeciesDataComponent implements OnInit {
  id: any;
  loaded = false;
  species!: Species;

  // clean arrays
  pepoleRoutes: string[] = [];
  filmsRoutes: string[] = [];

  constructor(private route: ActivatedRoute, private end: EndpointService, private router: Router, private routeSer: RouteHolderService) {
    //console.log(this.router.url)
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.end.getSpeciesById(this.id).subscribe(data => {

      this.species = data;

      if (this.species.people.length > 0) {
        for (let i = 0; i < this.species.people.length; i++) {
          const path = this.species.people[i];
        const result: string[] = path.split("/")
        this.pepoleRoutes.push(result[result.length - 2] + "/");
        }
       // console.log(this.filmsRoutes)
      }

      if (this.species.films.length > 0) {
        for (let i = 0; i < this.species.films.length; i++) {
          const path = this.species.films[i];
        const result: string[] = path.split("/")
        this.filmsRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
        // console.log(this.vehiclesRoutes)
      }
      this.loaded = true;
    })

  }
}
