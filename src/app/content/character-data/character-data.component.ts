import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-data',
  templateUrl: './character-data.component.html',
  styleUrls: ['./character-data.component.css']
})
export class CharacterDataComponent implements OnInit {

  items = [
    {CharName: 'Luke', imageName: 'Luke', router: 'luke'},
    {CharName: 'Leia', imageName: 'Leia', router: 'leia'},
    {CharName: 'Vader', imageName: 'Vader', router: 'vader'},
    {CharName: 'C3PO', imageName: 'C3PO', router: 'c3po'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
