import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../classes/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed = false;
  //showMenu = false;
  @Output() onNewUser = new EventEmitter();
  private isUserLoggedIn = false;
  private userName: string;
  constructor(private auth: AuthService, private router: Router) {
    // Promise of the Login
    auth.userSignedIn.subscribe(
      (user: User) => {
        this.userName = user.name;
        this.isUserLoggedIn = true;
      }
    );

    // Promise of the Registration
    auth.userSignedUp.subscribe(
      () => {
        this.userName = '';
        this.isUserLoggedIn = false;
      }
    );

    // Promise of the Logout
    auth.userLogOut.subscribe(
      () => {
        this.isUserLoggedIn = false;
      }
    );
  }

  ngOnInit() {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
    if (this.isUserLoggedIn) {
      const user = this.auth.getUser();
      this.userName = user.name;
    }
  }
  newUser() {
    this.onNewUser.emit();
  }

  logOut(e){
    e.preventDefault();
    //alert('Effettua il login');
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  signIn(e){
    e.preventDefault();
    this.router.navigate(['login']);
  }

  signUp(e){
    e.preventDefault();
    this.auth.logOut();
    this.router.navigate(['signup']);
  }

  /*toggleMenu(){
    this.showMenu = !this.showMenu;
  }*/
}
