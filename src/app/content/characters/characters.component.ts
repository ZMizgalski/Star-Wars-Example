import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

items = [
  {CharName: 'Characters', imageName: 'character image', router: 'character'},
  {CharName: 'Films', imageName: 'film image', router: 'films'},
  {CharName: 'Star Ships', imageName: 'ship image', router: 'starships'},
  {CharName: 'Vehicles', imageName: 'vehicle image', router: 'vehicles'},
  {CharName: 'Species', imageName: 'specie image', router: 'species'},
  {CharName: 'Planets', imageName: 'planet image', router: 'planets'},
];

  constructor(private route: Router) {
   }

  ngOnInit(): void {
  }

}
