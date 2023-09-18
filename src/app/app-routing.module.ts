import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tours',
    pathMatch: 'full'
  },
  {
    path: 'tours',
    canActivate: [authGuard],
    loadChildren: () => import('../app/modules/tour/tour.module').then(m => m.TourModule)
  },
  {
    path: 'login',
    loadChildren: () => import('../app/modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('../app/modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'forgetPassword',
    loadChildren: () => import('../app/modules/forget-password/forget-password.module').then(m => m.ForgetPasswordModule)
  },
  {
    path: 'resetPassword',
    loadChildren: () => import('../app/modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'users/me',
    canActivate: [authGuard],
    loadChildren: () => import('../app/modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'searchedTour/:searchedTour',
    canActivate: [authGuard],
    loadChildren: () => import('../app/modules/searched-tour/searched-tour.module').then(m => m.SearchedTourModule)
  },
  {
    path: 'createTour',
    canActivate: [authGuard],
    loadChildren: () => import('../app/modules/create-tour/create-tour.module').then(m => m.CreateTourModule)
  },
  {
    path: '**',
    redirectTo: 'tours',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
