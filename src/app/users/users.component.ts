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
  this.service.getUsers().subscribe(
      response => this.users = response['data']
  );
  }
  onDeleteUser(user: User) {
    const deleteUser = confirm('Vuoi veramente eliminare l\'utente ' + user.name + user.lastname);
    if (deleteUser) {
      this.service.deleteUser(user).subscribe(
      response => {
        const idx = this.users.indexOf(user);
        this.users.splice(idx, 1);
        alert(response['message']);
      }
    );
    }
  }
  onSelectUser(user: User) {
    //alert(user.lastname);
    //this.updateUser.emit(user);
    const userCopy = Object.assign({}, user);
    this.updateUser.emit(userCopy);
  }
}
