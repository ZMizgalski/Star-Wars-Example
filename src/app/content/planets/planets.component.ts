import { Component, OnInit, HostListener } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Planets } from 'src/app/servieces/class/planets/planets';
import { Router } from '@angular/router';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';
import { Page } from 'src/app/servieces/class/page/page';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.css'],
})
export class PlanetsComponent implements OnInit {
  noNextPages = false;
  page!: Page;
  planets: Planets[] = [];
  constructor(
    private end: EndpointService,
    private route: Router,
    private routeSer: RouteHolderService
  ) {}
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (this.bottomReached()) {
      this.end.getVehiclePage(this.i).subscribe(data => {
        this.page = data;

        if (!this.page.next) {
          return;
        }
        this.planets = this.planets.concat(this.page.results);

        for (let i = 0; i < this.planets.length; i++) {
          const path = this.planets[i];
          const result: string[] = path.url.split('/');
          this.planets[i].id = result[result.length - 2] + '/';
        }
        const result = this.page.next.split('=');
        // console.log(result[result.length - 1])
        this.i = parseInt(result[result.length - 1]);
      });
    }
  }

  bottomReached(): boolean {
    return window.innerHeight + window.scrollY + window.outerHeight >= document.body.offsetHeight;
  }

  i = 1;
  ngOnInit(): void {
    this.getData(this.i);
  }

  getData(id: number) {
    this.end.getVehiclePage(id).subscribe(data => {
      this.page = data;
      this.planets = this.planets.concat(this.page.results);

      for (let i = 0; i < this.planets.length; i++) {
        const path = this.planets[i];
        const result: string[] = path.url.split('/');
        this.planets[i].id = result[result.length - 2] + '/';
      }

      if (!this.page.next) {
        return;
      }

      const result = this.page.next.split('=');
      // console.log(result[result.length - 1])
      this.i = parseInt(result[result.length - 1]);

      // console.log(this.starShip);
    });
  }
}
