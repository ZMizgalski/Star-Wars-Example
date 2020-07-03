import { Component, OnInit, DoCheck } from '@angular/core';
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
export class FilmsComponent implements OnInit, DoCheck {

  val?: number;
  page!: Page;
  films: Films[] = [];
  noNextPages = false;
  loadNext = false;
  constructor(private end: EndpointService, private route: Router, private data: RouteHolderService) {
   }

   i = 1;
   ngOnInit(): void {
      this.getData(this.i);
      this.data.currentsize.subscribe(val => this.val = val)
   }

   getData(id: number) {
     this.end.geteFilmsPage(id).subscribe(data => {

       this.page = data;

       this.films = this.films.concat(this.page.results);

       if (this.page.next === null) {
         this.noNextPages = true
       } else {
        this.noNextPages = false;
       }

    })
   }

   ngDoCheck(): void {
  }

}
