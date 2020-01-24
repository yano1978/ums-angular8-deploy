import { UserInterface } from './../interfaces/user';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable, EventEmitter, Output } from "@angular/core";
import { User } from "../classes/user";

interface Jwt {
  access_token: string;
  token_type: string;
  expires_in: number;
  user_name: string;
  email: string;
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private isUserLogged = false;

  @Output() userSignedIn = new EventEmitter<User>();
  @Output() userSignedUp = new EventEmitter<User>();
  @Output() userLogOut = new EventEmitter();
  private APIAUTHURL = "http://localhost:8000/api/auth/";
  constructor(private http: HttpClient) {}
  isUserLoggedIn() {
    this.isUserLogged = !!localStorage.getItem("token");
    return this.isUserLogged;
  }
  signIn(email: string, password: string) {
    //alert(email + ' ' + password);
    this.http
      .post(this.APIAUTHURL + "login", {
        email: email,
        password: password
      })
      .subscribe(
        (payload: Jwt) => {
          localStorage.setItem("token", payload.access_token);
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
      ); /*
    localStorage.setItem("token", email);
    const user = new User();
    user.name = "Connesso";
    user.email = email;
    this.userSignedIn.emit(user);
    return true;
    */
  }

  signUp(username: string, email: string, password: string) {
    localStorage.setItem("token", email);
    const user = new User();
    user.name = "Benvenuto, " + username;
    user.email = email;
    this.userSignedUp.emit(user);
    this.userSignedIn.emit(user);
    return true;
  }

  logOut() {
    //return this.isUserLogged = false;
    localStorage.removeItem("token");
    localStorage.removeItem('user');
    this.userLogOut.emit();
    return (this.isUserLogged = false);
  }
  getUser(): User {
    const data = JSON.parse(localStorage.getItem('user'));
    const user = new User();
    if (data) {
      user.name = data[('user_name')];
      //user.email = email[('email')];
    }
    return user;
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
