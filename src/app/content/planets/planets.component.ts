import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Planets } from 'src/app/servieces/class/planets/planets';
import { Router } from '@angular/router';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {


  planets!: Planets;
  constructor(private end: EndpointService, private route: Router, private routeSer: RouteHolderService) {
  }

  ngOnInit(): void {

     this.end.getPlanets().subscribe(data => {
       console.log(data)
      this.planets = <Planets>data.results;
    })
  }

}
