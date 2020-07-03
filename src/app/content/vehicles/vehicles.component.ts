import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Vehicle } from 'src/app/servieces/class/vehicles/vehicle';
import { Router } from '@angular/router';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';
import { Page } from 'src/app/servieces/class/page/page';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  noNextPages = false;
  page!: Page;
  vehicles: Vehicle[] = [];
  filmsRoutes: any;

  constructor(private end: EndpointService, private route: Router, private routeSer: RouteHolderService) {
    //console.log(this.router.url)
   }



   i = 1;
   ngOnInit(): void {
      this.getData(this.i);
   }

   getData(id: number) {
    this.end.getVehiclePage(id).subscribe(data => {
      this.page = data;
      this.vehicles = this.vehicles.concat(this.page.results);

      for (let i = 0; i < this.vehicles.length; i++) {
      const path = this.vehicles[i];
      const result: string[] = path.url.split("/")
      this.vehicles[i].id = result[result.length - 2] + "/";
      }

      if (this.page.next === null) {
        this.noNextPages = true
      } else {
       this.noNextPages = false;
      }

    })
   }

}
