import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signUp(form: NgForm) {
  //  alert(form.valid);
  const result = this.auth.signUp(form.value.email, form.value.password, form.value.name);
  if (!result) {
      return false;
    } else {
      this.router.navigate(['']);
    }
  }
}
