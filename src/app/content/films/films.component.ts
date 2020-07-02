import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Films } from 'src/app/servieces/class/films/films';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films!: Films[];
  constructor(private end: EndpointService) { }

  ngOnInit(): void {

     this.end.getFilms().subscribe(data => {
      this.films = data.results;
    })
  }
}
