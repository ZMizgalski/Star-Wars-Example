import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ItemDetailsComponent } from './components/content/item-details/item-details.component';
import { ItemListComponent } from './components/content/item-list/item-list.component';
import { AllItemsListComponent } from './components/content/all-items-list/all-items-list.component';
import { SliderComponent } from './components/slider/slider.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ItemDetailsComponent,
    ItemListComponent,
    AllItemsListComponent,
    SliderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, SliderModule],
  providers: [HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
