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
import { HttpClientModule } from '@angular/common/http';
import { FilmsDataComponent } from './content/films-data/films-data.component';
import { PlanetsDataComponent } from './content/planets-data/planets-data.component';
import { SpeciesDataComponent } from './content/species-data/species-data.component';
import { StarShipsDataComponent } from './content/star-ships-data/star-ships-data.component';
import { VehiclesDataComponent } from './content/vehicles-data/vehicles-data.component';
import { SliderComponent } from './content/slider/slider.component';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';

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
    FilmsDataComponent,
    PlanetsDataComponent,
    SpeciesDataComponent,
    StarShipsDataComponent,
    VehiclesDataComponent,
    SliderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, SliderModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
