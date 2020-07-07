import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllItemsListComponent } from './components/content/all-items-list/all-items-list.component';
import { ItemListComponent } from './components/content/item-list/item-list.component';
import { ItemDetailsComponent } from './components/content/item-details/item-details.component';
const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'home' },
    children: [
      { path: '', component: AllItemsListComponent },

      {
        path: 'people',
        data: { breadcrumb: 'Characters' },
        children: [
          { path: '', component: ItemListComponent },
          { path: ':id', component: ItemDetailsComponent, data: { breadcrumb: '' } },
        ],
      },

      {
        path: 'films',
        data: { breadcrumb: 'Films' },
        children: [
          { path: '', component: ItemListComponent },
          { path: ':id', component: ItemDetailsComponent, data: { breadcrumb: '' } },
        ],
      },
      {
        path: 'starships',
        data: { breadcrumb: 'StarShips' },
        children: [
          { path: '', component: ItemListComponent },
          { path: ':id', component: ItemDetailsComponent, data: { breadcrumb: '' } },
        ],
      },
      {
        path: 'vehicles',
        data: { breadcrumb: 'Vehicles' },
        children: [
          { path: '', component: ItemListComponent },
          { path: ':id', component: ItemDetailsComponent, data: { breadcrumb: '' } },
        ],
      },
      {
        path: 'species',
        data: { breadcrumb: 'Species' },
        children: [
          { path: '', component: ItemListComponent },
          { path: ':id', component: ItemDetailsComponent, data: { breadcrumb: '' } },
        ],
      },
      {
        path: 'planets',
        data: { breadcrumb: 'Planets' },
        children: [
          { path: '', component: ItemListComponent },
          { path: ':id', component: ItemDetailsComponent, data: { breadcrumb: '' } },
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
