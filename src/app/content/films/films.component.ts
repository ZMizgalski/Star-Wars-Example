import { Component, OnInit, DoCheck } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Films } from 'src/app/servieces/class/films/films';
import { Router } from '@angular/router';
import { Page } from 'src/app/servieces/class/page/page';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, DoCheck {

  page!: Page;
  films: Films[] = [];
  noNextPages = false;
  loadNext = false;
  constructor(private end: EndpointService, private route: Router) {
    console.log(this.route.url)
   }

   i = 1;
   ngOnInit(): void {
      this.getData(this.i);
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
