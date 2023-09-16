import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchedTourComponent } from './components/searched-tour/searched-tour.component';
import { searchedTourResolver } from './resolvers/searched-tour.resolver';

const routes: Routes = [
  {
    path: '',
    component: SearchedTourComponent,
    resolve: {searchedTours: searchedTourResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchedTourRoutingModule {}
