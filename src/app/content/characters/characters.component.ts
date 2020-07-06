import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { RouteHolderService } from 'src/app/servieces/dataHolders/route-holder.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit, DoCheck {
  val?: number;
  items = [
    { CharName: 'Characters', imageName: 'character image', router: 'character' },
    { CharName: 'Films', imageName: 'film image', router: 'films' },
    { CharName: 'Star Ships', imageName: 'ship image', router: 'starships' },
    { CharName: 'Vehicles', imageName: 'vehicle image', router: 'vehicles' },
    { CharName: 'Species', imageName: 'specie image', router: 'species' },
    { CharName: 'Planets', imageName: 'planet image', router: 'planets' },
  ];

  constructor(private route: Router, private data: RouteHolderService) {}
  ngDoCheck(): void {}

  ngOnInit(): void {}
}
