import {Injectable} from '@angular/core';
import {UserInterface} from '../interfaces/user';

@Injectable()

export class UserService {
  users: UserInterface[] = [
    {
      id: 1,
      name: 'Ernesto1',
      lastname: 'Ianuario',
      email: 'yano1978@gmail.com',
      fiscalcode: 'RSAHRN72M22Z444S',
      province: 'Pesaro',
      phone: '454545455',
      age: 41

    },
    {
      id: 2,
      name: 'Ernesto2',
      lastname: 'Ianuario',
      email: 'yano1978@gmail.com',
      fiscalcode: 'RSAHRN72M22Z444S',
      province: 'Pesaro',
      phone: '454545455',
      age: 41
    },
    {
      id: 3,
      name: 'Ernesto3',
      lastname: 'Ianuario',
      email: 'yano1978@gmail.com',
      fiscalcode: 'RSAHRN72M22Z444S',
      province: 'Pesaro',
      phone: '454545455',
      age: 41
    },
    {
      id: 4,
      name: 'Ernesto4',
      lastname: 'Ianuario',
      email: 'yano1978@gmail.com',
      fiscalcode: 'RSAHRN72M22Z444S',
      province: 'Pesaro',
      phone: '454545455',
      age: 41
    }
  ];

  constructor() {
  }

  getUsers() {
    return this.users;
  }

  getUser(id: number): UserInterface {
    return this.users.find(user => user.id === id);
  }

  deleteUser(user: UserInterface) {
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.users.splice(index, 1);
    }

  }

  updateUser(user: UserInterface) {
    const idx = this.users.findIndex((v) => v.id === user.id);
    alert(idx);
    if (idx !== -1) {
      this.users[idx] = user;
    }
  }


  createUser(user: UserInterface) {
    user.id = this.users.length + 1;
    this.users.splice(0, 0, user);

  }
}

