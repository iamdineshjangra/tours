import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'api/v1/tours',
    pathMatch: 'full'
  },
  {
    path: 'api/v1/tours',
    loadChildren: () => import('../app/modules/tour/tour.module').then(m => m.TourModule)
  },
  {
    path: 'api/v1/users/login',
    loadChildren: () => import('../app/modules/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
