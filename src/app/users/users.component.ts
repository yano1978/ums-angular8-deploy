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

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      response => this.users = response['data']
    );
  }

  onDeleteUser(user: User) {

    this.userService.deleteUser(user);
  }

  onSelectUser(user: User) {
    const userCopy = Object.assign({}, user);
    this.updateUser.emit(userCopy);
  }
}
