
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenstorageService } from './tokenstorage.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  roles: string[] = [];

  constructor(private tokenService: TokenstorageService, private router: Router) {
    this.roles=this.tokenService.getUser().roles ; 
  }

  canActivate(
    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('Current URL:', state.url);

    if (this.tokenService.getToken()) {
      const userRoles: string[] = this.tokenService.getUser().roles;

      if(userRoles.includes('ADMIN')){
         if (state.url === '/dashboard/login') {
          console.log('fff')
          // User is trying to access the login page while already authenticated
          Swal.fire({
            icon: 'info',
            title: 'Info',
            text: 'Vous êtes déjà connecté',
            timer: 3000
          });
          return false;
        }
        return true;
      }
     
      else {
        // User doesn't have the required roles, redirect to login
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vous n\'avez pas le droit d\'accéder à cette page',
        footer: '<a href>Why do I have this issue?</a>',
        timer:3000

       });
        this.router.navigate(['/front/home']);
       
        return false;
      }
      
    } else {
      // L'utilisateur n'est pas authentifié, rediriger vers la page de connexion
      this.router.navigate(['/dashboard/login']);
      return false;
    }
}
}
