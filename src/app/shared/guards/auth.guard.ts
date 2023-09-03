import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
):  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
   const router: Router = inject(Router);
   const authService: AuthService = inject(AuthService);
   if(authService.isAuthenticated()) {
    return true;
   } else {
    router.navigate(['api/v1/login']);
    return false;
   }
};
