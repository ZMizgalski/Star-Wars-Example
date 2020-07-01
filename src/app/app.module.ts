import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { CharactersComponent } from './content/characters/characters.component';
import { FilmsComponent } from './content/films/films.component';
import { StarShipsComponent } from './content/star-ships/star-ships.component';
import { VehiclesComponent } from './content/vehicles/vehicles.component';
import { SpeciesComponent } from './content/species/species.component';
import { PlanetsComponent } from './content/planets/planets.component';
import { CharacterDataComponent } from './content/character-data/character-data.component';
import { CharacterDataSpecComponent } from './content/character-data-spec/character-data-spec.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    CharactersComponent,
    FilmsComponent,
    StarShipsComponent,
    VehiclesComponent,
    SpeciesComponent,
    PlanetsComponent,
    CharacterDataComponent,
    CharacterDataSpecComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
