import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { StarShip } from 'src/app/servieces/class/star-ship/star-ship';
import { Router } from '@angular/router';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';

@Component({
  selector: 'app-star-ships',
  templateUrl: './star-ships.component.html',
  styleUrls: ['./star-ships.component.css']
})
export class StarShipsComponent implements OnInit {

  starShip!: StarShip;
  constructor(private end: EndpointService, private route: Router, private routeSer: RouteHolderService) {
   }

  ngOnInit(): void {
     this.end.getStarships().subscribe(data => {
      this.starShip = data.results;
    })
  }

}
