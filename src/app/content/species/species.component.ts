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

  noNextPages = false;
  page!: Page;
  species: Species[] = [];
  constructor(private end: EndpointService, private router: Router, private routeSer: RouteHolderService) {
    //console.log(this.router.url)
  }


  i = 1;
  ngOnInit(): void {
     this.getData(this.i);
  }

  getData(id: number) {
    this.end.getSpeciesPage(id).subscribe(data => {
      // console.log(data)
      this.page = data;
      this.species = this.species.concat(this.page.results);
      if (this.page.next === null) {
        this.noNextPages = true
      } else {
       this.noNextPages = false;
      }
   })
  }

}
