import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { StarShip } from 'src/app/servieces/class/star-ship/star-ship';
import { Router } from '@angular/router';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';
import { Page } from 'src/app/servieces/class/page/page';

@Component({
  selector: 'app-star-ships',
  templateUrl: './star-ships.component.html',
  styleUrls: ['./star-ships.component.css']
})
export class StarShipsComponent implements OnInit {
  noNextPages = false;
  page!: Page;
  starShip: StarShip[] = [];
  constructor(private end: EndpointService, private route: Router, private routeSer: RouteHolderService) {
   }

   i = 1;
   ngOnInit(): void {
      this.getData(this.i);
   }

   getData(id: number) {
     this.end.getStarSPage(id).subscribe(data => {
       // console.log(data)
       this.page = data;
       this.starShip = this.starShip.concat(this.page.results);
       if (this.page.next === null) {
        this.noNextPages = true
      } else {
       this.noNextPages = false;
      }
    })
   }



}
