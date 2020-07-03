import { Component, OnInit } from '@angular/core';
import { EndpointService} from '../../servieces/endpoint.service';
import { People } from 'src/app/servieces/class/pepole/people';
import { Router } from '@angular/router';
import { Page } from 'src/app/servieces/class/page/page';
import { PercentPipe } from '@angular/common';


@Component({
  selector: 'app-character-data',
  templateUrl: './character-data.component.html',
  styleUrls: ['./character-data.component.css']
})
export class CharacterDataComponent implements OnInit {

  page!: Page;
  people: People[] = [];
  noNextPages = false;
  constructor(private end: EndpointService, private route: Router) { }

  i = 1;
  ngOnInit(): void {
     this.getData(this.i);
  }

  getData(id: number) {
    this.end.getPlanetsPage(id).subscribe(data => {

      this.page = data;

      this.people = this.people.concat(this.page.results);
      console.log(this.people);

      if (this.page.next === null) {
        this.noNextPages = true
      } else {
       this.noNextPages = false;
      }
   })
  }

}
