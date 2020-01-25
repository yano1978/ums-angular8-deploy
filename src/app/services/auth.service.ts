import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { User } from '../classes/user';

interface Jwt {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isUserLogged = false;

  @Output() userSignedIn = new EventEmitter<User>();
  @Output() userSignedUp = new EventEmitter<User>();
  @Output() userLogOut = new EventEmitter();
  private APIAUTHURL = environment.APIAUTH;
  constructor(private http: HttpClient) {}
  isUserLoggedIn() {
    this.isUserLogged = !!localStorage.getItem('token');
    return this.isUserLogged;
  }
  signIn(email: string, password: string) {
    this.http
      .post(this.APIAUTHURL + 'login', {
        email: email,
        password: password
      })
      .subscribe(
        (payload: Jwt) => {
          localStorage.setItem('token', payload.access_token);
          console.log(payload);
          localStorage.setItem('user', JSON.stringify(payload));
          const user = new User();
          user.name = payload.user_name;
          user.email = payload.email;
          this.userSignedIn.emit(user);
          return true;
        },
        (httpResp: HttpErrorResponse) => {
          alert(httpResp.message);
        }
      );
  }

  signUp(username: string, email: string, password: string) {
   const user = new User();
   user.name = username;
   user.email = email;
   this.http
      .post(this.APIAUTHURL + 'signup', {
        email: email,
        password: password,
        name : username
      })
      .subscribe(
        (payload: Jwt) => {
          localStorage.setItem('token', payload.access_token);
          console.log(payload);
          localStorage.setItem('user', JSON.stringify(payload));
          this.userSignedUp.emit(user);
          return true;
        },
        (httpResp: HttpErrorResponse) => {
          alert(httpResp.message);
        }
      );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userLogOut.emit();
    return (this.isUserLogged = false);
  }
  getUser(): User {
    const data = JSON.parse(localStorage.getItem('user'));
    const user = new User();
    if (data) {
      user.name = data[('user_name')];
    }
    return user;
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
