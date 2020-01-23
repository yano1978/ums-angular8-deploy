import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogged = false;

  constructor() { }
  isUserLoggedIn() {
    this.isUserLogged = !!localStorage.getItem('token');
    return this.isUserLogged;
  }
  signIn(email: string, password: string){
    //alert(email + ' ' + password);
    localStorage.setItem('token', email);
    return true;
  }

  signUp(username: string, email: string, password: string){
    localStorage.setItem('token', email);
    return true;
  }

  logOut(){
    //return this.isUserLogged = false;
    localStorage.removeItem('token');
    return this.isUserLogged = false;
  }
}
