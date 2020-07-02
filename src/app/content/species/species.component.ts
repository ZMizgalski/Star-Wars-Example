import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Species } from 'src/app/servieces/class/species/species';

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css']
})
export class SpeciesComponent implements OnInit {


  species!: Species;
  constructor(private end: EndpointService) { }

  ngOnInit(): void {

     this.end.getSpecies().subscribe(data => {
      this.species = data.results;
    })
  }

}
