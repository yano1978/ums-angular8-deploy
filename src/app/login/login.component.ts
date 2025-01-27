import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { User } from '../classes/User';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
    auth.userSignedIn.subscribe(
      (user: User) => {
        router.navigate(['']);
      }
    );
  }

  ngOnInit() {}

  signIn(form: NgForm) {
    if (!form.valid) {
      return false; 
    }
    const result = this.auth.signIn(form.value.email, form.value.password);
    if (result != null) {
      this.router.navigate(['']);
    }
  }
}
