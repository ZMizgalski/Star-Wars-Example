import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Planets } from 'src/app/servieces/class/planets/planets';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {


  planets!: Planets[];
  constructor(private end: EndpointService) { }

  ngOnInit(): void {

     this.end.getPlanets().subscribe(data => {
      this.planets = data.results;
      console.log(this.planets);
    })
  }

}
