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
  {path: '', component: CharactersComponent, data: {breadcrumb: 'home'} , children: [
    {path: 'character', component: CharacterDataComponent, data: {breadcrumb: 'Characters'}},
    {path: 'character/:id', component: CharacterDataSpecComponent, data: {breadcrumb: 'Character'}},
    {path: 'films', component: FilmsComponent, data: {breadcrumb: 'Films'}},
    {path: 'films/:id', component: FilmsDataComponent, data: {breadcrumb: 'Film'}},
    {path: 'starships', component: StarShipsComponent, data: {breadcrumb: 'StarShips'}},
    {path: 'starships/:id', component: StarShipsDataComponent, data: {breadcrumb: 'StarShip'}},
    {path: 'vehicles', component: VehiclesComponent, data: {breadcrumb: 'Vehicles'}},
    {path: 'vehicles/:id', component: VehiclesDataComponent, data: {breadcrumb: 'Vehicle'}},
    {path: 'species', component: SpeciesComponent, data: {breadcrumb: 'Species'}},
    {path: 'species/:id', component: SpeciesDataComponent, data: {breadcrumb: 'Specie'}},
    {path: 'planets', component: PlanetsComponent, data: {breadcrumb: 'Planets'}},
    {path: 'planets/:id', component: PlanetsDataComponent, data: {breadcrumb: 'Planet'}},
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
