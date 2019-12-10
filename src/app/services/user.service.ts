import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { UserInterface } from '../interfaces/user';

@Injectable()

export class UserService {
    users: User[] = [
        {
            id: 1,
            name: 'Ernesto1',
            lastname: 'Ianuario1',
            email: 'yano1978@gmail.com',
            fiscalcode: 'NRIRST78R02E435P',
            province: 'Pesaro',
            phone: '603245336',
            age: 41
        },
        {
            id: 2,
            name: 'Ernesto2',
            lastname: 'Ianuario2',
            email: 'yano1978@gmail.com',
            fiscalcode: 'NRIRST78R02E415P',
            province: 'Pesaro',
            phone: '603245336',
            age: 41
        },
        {
            id: 3,
            name: 'Ernesto3',
            lastname: 'Ianuario3',
            email: 'yano1978@gmail.com',
            fiscalcode: 'NRIRST78R02E415P',
            province: 'Pesaro',
            phone: '603245336',
            age: 41
        },
        {   
            id: 4,
            name: 'Ernesto4',
            lastname: 'Ianuario4',
            email: 'yano1978@gmail.com',
            fiscalcode: 'NRIRST78R02E415P',
            province: 'Pesaro',
            phone: '603245336',
            age: 41
        }
    ];
    constructor() {
    }
    getUsers() {
        return this.users;
    }
    deleteUser(user) {
        let index = this.users.indexOf(user);
        if (index >= 0) {
            this.users.splice(index, 1);
        }
    }
    updateUser(user: User) {
        const idx = this.users.findIndex((v) => v.id === user.id);
        alert(idx);
        if (idx !== -1){
          this.users[idx] = user;
        }
    }
}

