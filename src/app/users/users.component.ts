import { User } from './../classes/user';
import { Component, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector : 'app-users',
  templateUrl: './users.component.html',
  styleUrls : ['./users.component.css']
})

export class UsersComponent implements OnInit {
  title = 'Utenti';
  users: User[] = [];
  @Output('updateUser') updateUser = new EventEmitter<User>();
  constructor(private service: UserService) {
  }
  ngOnInit() {
  this.users = this.service.getUsers();
  }
  onDeleteUser(user: User) {
    //alert(user.lastname);
    this.service.deleteUser(user);
  }
  onSelectUser(user: User) {
    //alert(user.lastname);
    //this.updateUser.emit(user);
    const userCopy = Object.assign({}, user);
    this.updateUser.emit(userCopy);
  }
}
