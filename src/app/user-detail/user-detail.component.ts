import { UserService } from "./../services/user.service";
import { Component, OnInit, Input } from "@angular/core";
import { User } from "../classes/user";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"]
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

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = new User();/*
    // params DEPRECATED soon

    this.route.params.subscribe(params => {
      if (!params.id) {
        return;
      }
      // We do the subscribe here

      // this.user = this.userService.getUser(+params.id);
      this.userService
        .getUser(+params.id)
        .subscribe(response => (this.user = response["data"]));
    });
    */
   // New mapping Observable method pararMap

   this.route.paramMap.subscribe(params => {
    if (!params.get('id')) {
      return;
    }
    // We do the subscribe here

    // this.user = this.userService.getUser(+params.id);
    this.userService
      .getUser(+params.get('id'))
      .subscribe(response => (this.user = response["data"]));
  });
  }

  saveUser() {
    if (this.user.id > 0) {
      this.updateUser(this.user);
    } else {
      this.createUser(this.user);
    }
  }

  updateUser(user: User) {
    // Old static method to save the user

    //this.userService.updateUser(this.user);

    // Subscribe to save the user receive from the user service
    this.userService.updateUser(this.user).subscribe(response => {
      if (response["success"]) {
        alert("L'Utente " + user.name + " è stato modificato correttamente");
        this.router.navigate(["users"]);
      } else {
        alert(response["message"]);
      }
    });
  }

  createUser(user: User) {
    this.userService.createUser(this.user).subscribe(response => {
      if (response["success"]) {
        alert("L'Utente " + user.name + " è stato creato correttamente");
        this.router.navigate(["users"]);
      } else {
        alert(response["message"]);
      }
    });
  }

  resetForm(f) {
    if (this.user.id === 0) {
      this.user = new User();
    } else {
      this.user = this.userCopy;
    }
  }

  backToUsers() {
    this.router.navigate(["users"]);
  }
}
