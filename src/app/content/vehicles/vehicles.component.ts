import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Vehicle } from 'src/app/servieces/class/vehicles/vehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {


  vehicles!: Vehicle[];
  filmsRoutes: any;

  constructor(private end: EndpointService) { }

  ngOnInit(): void {

     this.end.getVehicles().subscribe(data => {
      this.vehicles = data.results;

      for (let i = 0; i < this.vehicles.length; i++) {
      const path = this.vehicles[i];
      const result: string[] = path.url.split("/")
      this.vehicles[i].id = result[result.length - 2] + "/";
      }

    })
  }

}
