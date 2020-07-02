import { Component, OnInit } from '@angular/core';
import { EndpointService} from '../../servieces/endpoint.service';


@Component({
  selector: 'app-character-data',
  templateUrl: './character-data.component.html',
  styleUrls: ['./character-data.component.css']
})
export class CharacterDataComponent implements OnInit {

  items = [];
  constructor(private end: EndpointService) { }

  ngOnInit(): void {

     this.end.getPepole().subscribe(data => {
      this.items = data.results;
      console.log(this.items)
    })
  }

}
