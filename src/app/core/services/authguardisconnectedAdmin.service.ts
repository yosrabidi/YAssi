import { Injectable } from '@angular/core';
import { TokenstorageService } from './tokenstorage.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthguardISConnectedAdminService {
  constructor(private tokenService: TokenstorageService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenService.getToken()) {
      // User is already authenticated, prevent access to /dashboard/login
      const userRoles: string[] = this.tokenService.getUser().roles;

      if(userRoles.includes('ADMIN')){
        
      }
      Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'Vous êtes déjà connecté',
        timer: 3000
      });
      
      this.router.navigate(['/dashboard/home']);
      return false;
    }
     else {
      // User is not authenticated, allow access to any route
      return true;
    }
  }
}

