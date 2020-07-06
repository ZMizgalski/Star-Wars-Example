import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Films } from 'src/app/servieces/class/films/films';
import { Router } from '@angular/router';
import { Page } from 'src/app/servieces/class/page/page';
import { Observable } from 'rxjs';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  val?: number;
  page!: Page;
  films: Films[] = [];
  noNextPages = false;
  loadNext = false;
  constructor(private end: EndpointService, private route: Router, private data: RouteHolderService) {
   }
   @HostListener("window:scroll", [])
   onScroll(): void {
     if (this.bottomReached()) {
       this.end.geteFilmsPage(this.i).subscribe(data => {

        this.page = data;

        if (!this.page.next) {
          return;
        }
        this.films = this.films.concat(this.page.results);

        for (let i = 0; i < this.films.length; i++) {
        const path = this.films[i];
        const result: string[] = path.url.split("/")
        this.films[i].id = result[result.length - 2] + "/";
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
    this.end.geteFilmsPage(id).subscribe(data => {
      this.page = data;
      this.films = this.films.concat(this.page.results);

      for (let i = 0; i < this.films.length; i++) {
      const path = this.films[i];
      const result: string[] = path.url.split("/")
      this.films[i].id = result[result.length - 2] + "/";
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
