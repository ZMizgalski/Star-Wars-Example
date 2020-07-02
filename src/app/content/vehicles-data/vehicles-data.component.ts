import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Vehicle } from 'src/app/servieces/class/vehicles/vehicle';

@Component({
  selector: 'app-vehicles-data',
  templateUrl: './vehicles-data.component.html',
  styleUrls: ['./vehicles-data.component.css']
})
export class VehiclesDataComponent implements OnInit {


  vehicle!: Vehicle;
  loaded = false;
  id: any;
  // clean arrays
  pepoleRoutes: string[] = [];
  filmsRoutes: string[] = [];

  constructor(private route: ActivatedRoute, private end: EndpointService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    // console.log(this.id);
    this.end.getVehiclesById(this.id).subscribe(data => {

      this.vehicle = data;
      console.log(this.vehicle);

      if (this.vehicle.pilots.length > 0) {
        for (let i = 0; i < this.vehicle.pilots.length; i++) {
          const path = this.vehicle.pilots[i];
        const result: string[] = path.split("/")
        this.pepoleRoutes.push(result[result.length - 2] + "/");
        }
       // console.log(this.filmsRoutes)
      }

      if (this.vehicle.films.length > 0) {
        for (let i = 0; i < this.vehicle.films.length; i++) {
          const path = this.vehicle.films[i];
        const result: string[] = path.split("/")
        this.filmsRoutes.push(result[result.length - 3] + "/" + result[result.length - 2] + "/");
        }
        // console.log(this.vehiclesRoutes)
      }
      this.loaded = true;
    })


  }

}
