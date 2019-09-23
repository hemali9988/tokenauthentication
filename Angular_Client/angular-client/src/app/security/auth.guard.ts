import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate   {

  constructor(private router:Router,private authService:AuthService){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if(this.authService.isAuthenticated()){
              // logged in so return true

      return true;
    }
    // not logged in so redirect to login page with the return url and return false

    this.router.navigate(['account/login']);
    return false;
  }
  
  
}
