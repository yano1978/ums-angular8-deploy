import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogged = false;

  constructor() { }
  isUserLoggedIn(){
    return this.isUserLogged;
  }
  signIn(email: string, password: string){

  }

  signUp(username: string, email: string, password: string){

  }

  logOut(){
    return this.isUserLogged = false;
  }
}
