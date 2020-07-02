import { Component, OnInit } from '@angular/core';
import { EndpointService} from '../../servieces/endpoint.service';
import { People } from 'src/app/servieces/class/pepole/people';


@Component({
  selector: 'app-character-data',
  templateUrl: './character-data.component.html',
  styleUrls: ['./character-data.component.css']
})
export class CharacterDataComponent implements OnInit {

  people!: People[];

  constructor(private end: EndpointService) { }

  ngOnInit(): void {

     this.end.getPepole().subscribe(data => {
       this.people = data.results;
    })
  }

}
