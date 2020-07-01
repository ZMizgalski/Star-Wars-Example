import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

items = [
  {CharName: 'Characters', imageName: 'character image', router: 'character'},
  {CharName: 'Films', imageName: 'film image', router: 'films'},
  {CharName: 'Star Ships', imageName: 'ship image', router: 'star-ships'},
  {CharName: 'Vehicles', imageName: 'vehicle image', router: 'vehicles'},
  {CharName: 'Species', imageName: 'specie image', router: 'species'},
  {CharName: 'Planets', imageName: 'planet image', router: 'planets'},
];

  constructor() { }

  ngOnInit(): void {
  }

}
