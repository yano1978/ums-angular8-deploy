import { Injectable, EventEmitter, Output } from '@angular/core';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogged = false;

  @Output() userSignedIn = new EventEmitter<User>();
  @Output() userSignedUp = new EventEmitter<User>();
  @Output() userLogOut = new EventEmitter();

  constructor() { }
  isUserLoggedIn() {
    this.isUserLogged = !!localStorage.getItem('token');
    return this.isUserLogged;
  }
  signIn(email: string, password: string){
    //alert(email + ' ' + password);
    localStorage.setItem('token', email);
    const user = new User();
    user.name = 'Connesso';
    user.email = email;
    this.userSignedIn.emit(user);
    return true;
  }

  signUp(username: string, email: string, password: string){
    localStorage.setItem('token', email);
    const user = new User();
    user.name = 'Benvenuto, ' + username;
    user.email = email;
    this.userSignedUp.emit(user);
    this.userSignedIn.emit(user);
    return true;
  }

  logOut(){
    //return this.isUserLogged = false;
    localStorage.removeItem('token');
    this.userLogOut.emit();
    return this.isUserLogged = false;
  }
}
