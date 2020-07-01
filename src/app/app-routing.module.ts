import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './content/characters/characters.component';
import { FilmsComponent } from './content/films/films.component';
import { StarShipsComponent } from './content/star-ships/star-ships.component';
import { VehiclesComponent } from './content/vehicles/vehicles.component';
import { SpeciesComponent } from './content/species/species.component';
import { PlanetsComponent } from './content/planets/planets.component';
import { CharacterDataComponent } from './content/character-data/character-data.component';
import { CharacterDataSpecComponent } from './content/character-data-spec/character-data-spec.component';


const routes: Routes = [
  {path: '', component: CharactersComponent},
  {path: 'character', component: CharacterDataComponent},
  {path: 'character/:id', component: CharacterDataSpecComponent},
  {path: 'films', component: FilmsComponent},
  {path: 'star-ships', component: StarShipsComponent},
  {path: 'vehicles', component: VehiclesComponent},
  {path: 'species', component: SpeciesComponent},
  {path: 'planets', component: PlanetsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
