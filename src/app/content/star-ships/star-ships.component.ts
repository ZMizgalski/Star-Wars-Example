import { Component, OnInit, HostListener } from '@angular/core';
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
   @HostListener("window:scroll", [])
   onScroll(): void {
     if (this.bottomReached()) {
       this.end.getStarSPage(this.i).subscribe(data => {

        this.page = data;

        if (!this.page.next) {
          return;
        }
        this.starShip = this.starShip.concat(this.page.results);

        for (let i = 0; i < this.starShip.length; i++) {
        const path = this.starShip[i];
        const result: string[] = path.url.split("/")
        this.starShip[i].id = result[result.length - 2] + "/";
        }
         const result = this.page.next.split("=")
         // console.log(result[result.length - 1])
         this.i = parseInt(result[result.length - 1])
      })
     }
   }

   bottomReached(): boolean {
     return (window.innerHeight + window.scrollY + window.outerHeight) >= document.body.offsetHeight;
   }

   i = 1;
   ngOnInit(): void {
      this.getData(this.i);
   }

   getData(id: number) {
    this.end.getStarSPage(id).subscribe(data => {
      this.page = data;
      this.starShip = this.starShip.concat(this.page.results);

      for (let i = 0; i < this.starShip.length; i++) {
      const path = this.starShip[i];
      const result: string[] = path.url.split("/")
      this.starShip[i].id = result[result.length - 2] + "/";
      }

       if (!this.page.next) {
        return;
      }

       const result = this.page.next.split("=")
       // console.log(result[result.length - 1])
       this.i = parseInt(result[result.length - 1])

       // console.log(this.starShip);
    })
   }
}
