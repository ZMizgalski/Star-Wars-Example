import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';
import { Films } from 'src/app/servieces/class/films/films';
import { Router } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  films!: Films[];
  constructor(private end: EndpointService, private route: Router) {
    console.log(this.route.url)
   }

  ngOnInit(): void {

     this.end.getFilms().subscribe(data => {
      this.films = data.results;
    })
  }
}
