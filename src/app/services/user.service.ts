import { Injectable } from "@angular/core";
import { UserInterface } from "../interfaces/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "../classes/user";
import { AuthService } from "./auth.service";

@Injectable()
export class UserService {
  users: User[] = [];
  private APIURL = "http://localhost:8000/users";

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAuthHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: "Bearer " + this.auth.getToken()
    });
    return headers;
  }

  getUsers() {
    // We make the subscribe client side

    // this.http.get(this.APIURL).subscribe(
    //   data => {
    //     console.log(data)
    //   },
    //   error => alert(error.message)
    // )
    // return this.users;
    return this.http.get(this.APIURL, {
      headers: this.getAuthHeader()
    });
  }

  getUser(id: number) {
    // Now we always return a promise

    //return this.users.find(user => user.id === id);
    return this.http.get(this.APIURL + '/' + id);
  }

  deleteUser(user: UserInterface) {
    // Old static method to delete a user

    // const index = this.users.indexOf(user);
    // if (index >= 0) {
    //   this.users.splice(index, 1);
    // }
    const data = { _method: 'DELETE' };
    return this.http.post(this.APIURL + '/' + user.id, data);
  }

  updateUser(user: UserInterface) {
    // Old static method to change datas value

    // const idx = this.users.findIndex((v) => v.id === user.id);
    // alert(idx);
    // if (idx !== -1) {
    //   this.users[idx] = user;
    // }

    // We receive data to change the data value from the service
    user['_method'] = 'PUT';
    return this.http.post(this.APIURL + '/' + user.id, user);
  }

  createUser(user: UserInterface) {
    // Old static method to change datas value

    // user.id = this.users.length + 1;
    // this.users.splice(0, 0, user);

    // We receive data to create a new user in the service

    return this.http.post(this.APIURL, user);
  }
}
