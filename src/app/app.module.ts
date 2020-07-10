import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { MainNavComponent } from './components/content/main-nav/main-nav.component';
import { ItemDetailsComponent } from './components/content/item-details/item-details.component';
import { ItemListComponent } from './components/content/item-list/item-list.component';
import { AllItemsListComponent } from './components/content/all-items-list/all-items-list.component';
import { SliderComponent } from './components/slider/slider.component';
import { LoaderComponent } from './components/loader/loader.component';
import { InterceptorProviders } from './interceptors/interceptor-providers';
import { LoaderService } from './servieces/loader.service';
@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    ItemDetailsComponent,
    ItemListComponent,
    AllItemsListComponent,
    SliderComponent,
    LoaderComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, SliderModule],
  providers: [HttpClientModule, InterceptorProviders, LoaderService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
