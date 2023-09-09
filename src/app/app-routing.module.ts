import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'api/v1/tours',
    pathMatch: 'full'
  },
  {
    path: 'api/v1/tours',
    canActivate: [authGuard],
    loadChildren: () => import('../app/modules/tour/tour.module').then(m => m.TourModule)
  },
  {
    path: 'api/v1/login',
    loadChildren: () => import('../app/modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'api/v1/signup',
    loadChildren: () => import('../app/modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'api/v1/forgetPassword',
    loadChildren: () => import('../app/modules/forget-password/forget-password.module').then(m => m.ForgetPasswordModule)
  },
  {
    path: 'api/v1/resetPassword',
    loadChildren: () => import('../app/modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'api/v1/users/me',
    canActivate: [authGuard],
    loadChildren: () => import('../app/modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: '**',
    redirectTo: 'api/v1/tours',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
