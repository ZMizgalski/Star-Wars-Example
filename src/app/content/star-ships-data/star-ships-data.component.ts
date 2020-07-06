import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { StarShip } from 'src/app/servieces/class/star-ship/star-ship';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';

@Component({
  selector: 'app-star-ships-data',
  templateUrl: './star-ships-data.component.html',
  styleUrls: ['./star-ships-data.component.css'],
})
export class StarShipsDataComponent implements OnInit {
  ship!: StarShip;
  loaded = false;
  id: any;
  // clean arrays
  pepoleRoutes: string[] = [];
  filmsRoutes: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private end: EndpointService,
    private router: Router,
    private routeSer: RouteHolderService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.end.getStarShipsById(this.id).subscribe(data => {
      this.ship = data;
      // console.log(this.ship);

      if (this.ship.pilots.length > 0) {
        for (let i = 0; i < this.ship.pilots.length; i++) {
          const path = this.ship.pilots[i];
          const result: string[] = path.split('/');
          this.pepoleRoutes.push(result[result.length - 2] + '/');
        }
        // console.log(this.filmsRoutes)
      }

      if (this.ship.films.length > 0) {
        for (let i = 0; i < this.ship.films.length; i++) {
          const path = this.ship.films[i];
          const result: string[] = path.split('/');
          this.filmsRoutes.push(result[result.length - 3] + '/' + result[result.length - 2] + '/');
        }
        // console.log(this.vehiclesRoutes)
      }
      this.loaded = true;
    });
  }
}
