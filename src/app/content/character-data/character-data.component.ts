import { Component, OnInit, DoCheck, HostListener } from '@angular/core';
import { EndpointService} from '../../servieces/endpoint.service';
import { People } from 'src/app/servieces/class/pepole/people';
import { Router } from '@angular/router';
import { Page } from 'src/app/servieces/class/page/page';

@Component({
  selector: 'app-character-data',
  templateUrl: './character-data.component.html',
  styleUrls: ['./character-data.component.css']
})
export class CharacterDataComponent implements OnInit {

  page!: Page;
  people: People[] = [];
  noNextPages = false;
  constructor(private end: EndpointService, private route: Router) { }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.end.getVehiclePage(this.i).subscribe(data => {

       this.page = data;

       if (!this.page.next) {
         return;
       }
       this.people = this.people.concat(this.page.results);

       for (let i = 0; i < this.people.length; i++) {
       const path = this.people[i];
       const result: string[] = path.url.split("/")
       this.people[i].id = result[result.length - 2] + "/";
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
   this.end.getVehiclePage(id).subscribe(data => {
     this.page = data;
     this.people = this.people.concat(this.page.results);

     for (let i = 0; i < this.people.length; i++) {
     const path = this.people[i];
     const result: string[] = path.url.split("/")
     this.people[i].id = result[result.length - 2] + "/";
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
