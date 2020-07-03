import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Planets } from 'src/app/servieces/class/planets/planets';
import { Router } from '@angular/router';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';
import { Page } from 'src/app/servieces/class/page/page';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  noNextPages = false;
  page!: Page;
  planets: Planets[] = [];
  constructor(private end: EndpointService, private route: Router, private routeSer: RouteHolderService) {
  }

  i = 1;
  ngOnInit(): void {
     this.getData(this.i);
  }

  getData(id: number) {
    this.end.getPlanetsPage(id).subscribe(data => {
      // console.log(data)
      this.page = data;
      console.log(this.page);
      this.planets = this.planets.concat(this.page.results);
      if (this.page.next === null) {
        this.noNextPages = true
      } else {
       this.noNextPages = false;
      }
   })
  }

  getNextpage(){
    const result = this.page.next.split("=");
    const ia: number = parseInt(result[1]);
    console.log(ia);
    this.getData(ia);

  }

}
