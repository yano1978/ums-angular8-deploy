import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../classes/User';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  public User: User;
  public title = 'Dati Utente';
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.User = new User();

    // params DEPRECATED soon

    // this.route.params.subscribe(
    //   (p) => {
    //      // Here we receive the promise

    //      //this.User = this.userService.getUser(+p.id);
    //      this.userService.getUser(+p.id).subscribe(
    //         response => this.User = response['data']
    //      )
    //   }
    // );
    // New mapping Observable method pararMap

    this.route.paramMap.subscribe(
      (p) => {
         // Here we receive the promise

         //this.User = this.userService.getUser(+p.id);
         this.userService.getUser(+p.get('id')).subscribe(
            response => this.User = response['data']
         )
      }
    );
  }

  backToUsers(){
    this.router.navigate(['users']);
  }
}
