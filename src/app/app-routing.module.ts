import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './content/characters/characters.component';
import { FilmsComponent } from './content/films/films.component';
import { StarShipsComponent } from './content/star-ships/star-ships.component';
import { VehiclesComponent } from './content/vehicles/vehicles.component';
import { SpeciesComponent } from './content/species/species.component';
import { PlanetsComponent } from './content/planets/planets.component';
import { PlanetsDataComponent } from './content/planets-data/planets-data.component';
import { CharacterDataComponent } from './content/character-data/character-data.component';
import { CharacterDataSpecComponent } from './content/character-data-spec/character-data-spec.component';
import { FilmsDataComponent } from './content/films-data/films-data.component';
import { SpeciesDataComponent } from './content/species-data/species-data.component';
import { StarShipsDataComponent } from './content/star-ships-data/star-ships-data.component';
import { VehiclesDataComponent } from './content/vehicles-data/vehicles-data.component';
const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'home' },
    children: [
      { path: '', component: CharactersComponent },

      {
        path: 'character',
        data: { breadcrumb: 'Characters' },
        children: [
          { path: '', component: CharacterDataComponent },
          { path: ':id', component: CharacterDataSpecComponent, data: { breadcrumb: '' } },
        ],
      },
      // {path: 'character/:id', component: CharacterDataSpecComponent, data: {breadcrumb: 'Character'}},
      {
        path: 'films',
        data: { breadcrumb: 'Films' },
        children: [
          { path: '', component: FilmsComponent },
          { path: ':id', component: FilmsDataComponent, data: { breadcrumb: '' } },
        ],
      },
      // {path: 'films/:id', component: FilmsDataComponent, data: {breadcrumb: 'Film'}},
      {
        path: 'starships',
        data: { breadcrumb: 'StarShips' },
        children: [
          { path: '', component: StarShipsComponent },
          { path: ':id', component: StarShipsDataComponent, data: { breadcrumb: '' } },
        ],
      },
      {
        path: 'vehicles',
        data: { breadcrumb: 'Vehicles' },
        children: [
          { path: '', component: VehiclesComponent },
          { path: ':id', component: VehiclesDataComponent, data: { breadcrumb: '' } },
        ],
      },
      {
        path: 'species',
        data: { breadcrumb: 'Species' },
        children: [
          { path: '', component: SpeciesComponent },
          { path: ':id', component: SpeciesDataComponent, data: { breadcrumb: '' } },
        ],
      },
      {
        path: 'planets',
        data: { breadcrumb: 'Planets' },
        children: [
          { path: '', component: PlanetsComponent },
          { path: ':id', component: PlanetsDataComponent, data: { breadcrumb: '' } },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
