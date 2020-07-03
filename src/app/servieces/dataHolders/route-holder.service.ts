import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouteHolderService {

  constructor() { }

  getMenu(): Array<any> {
    const menu = [
      { name: '',
       path: './',
        children: [ ]
       },
      {
        name: 'character',
        path: './character',
        children: [

        ]
      },
      {
        name: 'films',
        path: './films',
        children: [ ]
      },
      {
        name: 'starships',
        path: './starships',
        children: [ ]
      },
      {
        name: 'vehicles',
        path: './vehicles',
        children: [ ]
      },
      {
        name: 'species',
        path: './species',
        children: [ ]
      },
      {
        name: 'planets',
        path: './planets',
        children: [ ]
      },

      ]
    return menu;
  }
}
