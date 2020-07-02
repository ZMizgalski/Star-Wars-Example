import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css']
})
export class PlanetsComponent implements OnInit {

  items = [];
  constructor(private end: EndpointService) { }

  ngOnInit(): void {

     this.end.getPlanets().subscribe(data => {
      this.items = data.results;
      console.log(this.items)
    })
  }

}
