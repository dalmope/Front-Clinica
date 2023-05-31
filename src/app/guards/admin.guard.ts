import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private authService: TokenService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isAdmin()) {
        return true; // El usuario está autenticado, permite el acceso a la ruta
      } else {
        // Redirige al usuario a la página de inicio de sesión
        return this.router.createUrlTree(['/home'], {
          queryParams: { returnUrl: state.url }
        });
      }
    }
  
}
