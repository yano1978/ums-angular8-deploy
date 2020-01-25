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

  constructor(private auth: AuthService, private router: Router) {
    auth.userSignedUp.subscribe(
      () => {
        router.navigate(['login']);
      }
    );
   }

  ngOnInit() {
  }

  signUp(form: NgForm) {
  //  alert(form.valid);
  /*const result = this.auth.signUp(form.value.name, form.value.email, form.value.password);
  /*if (!result) {
      return false;
    } else {
     // I can handle to redirect to the login page or login directly!
     // alert('La registrazione è avvenuta con successo, ora effettua il login')
     // this.router.navigate(['login']);
     this.router.navigate(['']);
    }*/
    this.auth.signUp(form.value.name, form.value.email, form.value.password);
    alert('Registrazione avvenuta con successo, ora effettua il log in');
  }
}
