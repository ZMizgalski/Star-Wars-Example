import { Component, OnInit } from '@angular/core';
import { EndpointService } from 'src/app/servieces/endpoint.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  items = [];
  constructor(private end: EndpointService) { }

  ngOnInit(): void {

     this.end.getFilms().subscribe(data => {
      this.items = data.results;
      console.log(this.items)
    })
  }
}
