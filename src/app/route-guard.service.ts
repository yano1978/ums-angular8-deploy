import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // alert('Impossibile modificare altri utenti');
    // this.router.navigate(['login']);
    // return false;
    if(this.auth.isUserLoggedIn()){
      return true;
    } else {
      alert('Impossibile modificare altri utenti');
      this.router.navigate(['login']);
    }
  }
}
