import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Species } from 'src/app/servieces/class/species/species';
import { Page } from 'src/app/servieces/class/page/page';
import { Router } from '@angular/router';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {


  species!: Species;
  constructor(private end: EndpointService, private router: Router, private routeSer: RouteHolderService) {
    //console.log(this.router.url)
  }

  ngOnInit(): void {

     this.end.getSpecies().subscribe(data => {
       //console.log(data);
      this.species = <Species>data.results;
    })
  }

}
