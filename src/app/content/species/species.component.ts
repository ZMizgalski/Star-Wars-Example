import { Component, OnInit, HostListener } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Species } from 'src/app/servieces/class/species/species';
import { Page } from 'src/app/servieces/class/page/page';
import { Router } from '@angular/router';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {

  noNextPages = false;
  page!: Page;
  species: Species[] = [];
  constructor(private end: EndpointService, private router: Router, private routeSer: RouteHolderService) {
    //console.log(this.router.url)
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.end.getVehiclePage(this.i).subscribe(data => {

       this.page = data;

       if (!this.page.next) {
         return;
       }
       this.species = this.species.concat(this.page.results);

       for (let i = 0; i < this.species.length; i++) {
       const path = this.species[i];
       const result: string[] = path.url.split("/")
       this.species[i].id = result[result.length - 2] + "/";
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
     this.species = this.species.concat(this.page.results);

     for (let i = 0; i < this.species.length; i++) {
     const path = this.species[i];
     const result: string[] = path.url.split("/")
     this.species[i].id = result[result.length - 2] + "/";
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
