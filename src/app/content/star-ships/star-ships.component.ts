import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { StarShip } from 'src/app/servieces/class/star-ship/star-ship';

@Component({
  selector: 'app-star-ships',
  templateUrl: './star-ships.component.html',
  styleUrls: ['./star-ships.component.css']
})
export class StarShipsComponent implements OnInit {

  starShip!: StarShip;
  constructor(private end: EndpointService) { }

  ngOnInit(): void {
     this.end.getStarships().subscribe(data => {
      this.starShip = data.results;
    })
  }

}
