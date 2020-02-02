import { Injectable } from '@angular/core';
import { UserInterface } from '../interfaces/userinterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/User';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable()
export class UserService {
  users: User[] = [];
  private APIURL = environment.APIRUL;

  constructor(private http: HttpClient, private auth: AuthService) {}

  getAuthHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.auth.getToken()
    });
    return headers;
  }

  getUsers() {
    return this.http.get(this.APIURL, {
      headers: this.getAuthHeader()
    });
  }

  getUser(id: number) {
    return this.http.get(this.APIURL + '/' + id, {
      headers: this.getAuthHeader()
    });
  }

  deleteUser(user: UserInterface) {
    const data = { _method: 'DELETE' };
    return this.http.post(this.APIURL + '/' + user.id, data, {
      headers: this.getAuthHeader()
    });
  }

  updateUser(user: UserInterface) {
    user['_method'] = 'PUT';
    return this.http.post(this.APIURL + '/' + user.id, user, {
      headers: this.getAuthHeader()
    });
  }

  createUser(user: UserInterface) {
    return this.http.post(this.APIURL, user, {
      headers: this.getAuthHeader()
    });
  }
}
