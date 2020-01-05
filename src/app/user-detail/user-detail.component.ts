import { UserService } from './../services/user.service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from '../classes/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  private userCopy: User;
  private __user: User;
  @Input() set user(user: User) {
    this.__user = user;
    this.userCopy = Object.assign({}, user);
  }
  get user() {
    return this.__user;
  }

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.user = new User();
    this.route.params.subscribe(
      (params) => {
        if (!params.id) {
          return;
        }
        this.userService.getUser(+params.id).subscribe(
          response => this.user = response['data']
        );
      }
    );
  }

  saveUser(){
    if(this.user.id > 0){
      this.updateUser(this.user);
    } else {
      this.createUser(this.user);
    }
  }

  updateUser(user:User) {
      this.userService.updateUser(this.user).subscribe(
        response => {
          if(response['success']){
            alert('Utente ' + user.name + ' modificato correttamente!');
          } else{
            alert(response['message']);
          }
          this.router.navigate(['users']);
        }
      );
  }

  createUser(user:User){
    this.userService.createUser(this.user).subscribe(
      response => {
        if(response['success']){
          alert('Utente ' + user.name + ' creato correttamente!');
        } else{
          alert(response['message']);
        }
        this.router.navigate(['users']);
      });
  }

  resetForm(form) {
    if (this.user.id === 0) {
      this.user = new User();
    } else {
      //form.reset();
      this.user = this.userCopy;
    }
  }
  backToUsers(){
    this.router.navigate(['users']);
  }
}
