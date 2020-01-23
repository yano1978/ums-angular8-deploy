import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
  }
  newUser() {
    this.onNewUser.emit();
  }

  logOut(e){
    e.preventDefault();
    this.auth.logOut();
    this.router.navigate(['login']);
  }

  /*toggleMenu(){
    this.showMenu = !this.showMenu;
  }*/
}
