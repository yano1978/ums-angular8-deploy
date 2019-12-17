import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isCollapsed = false;
  //showMenu = false;
  @Output() onNewUser = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  newUser() {
    this.onNewUser.emit();
  }
  /*toggleMenu(){
    this.showMenu = !this.showMenu;
  }*/
}
