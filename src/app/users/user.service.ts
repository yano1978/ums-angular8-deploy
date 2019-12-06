import { Injectable } from '@angular/core';

@Injectable()

  export class UserService {
    constructor() {
    }
   getUsers() {
       return [
           {
               name: 'Ernesto1',
               lastname: 'Ianuario',
               email: 'yano1978@gmail.com',
               fiscalcode: 'NRIRST78R02E435P',
               province: 'Pesaro',
               phone: '603245336',
               age: 41
           } ,
           {
               name: 'Ernesto2',
               lastname: 'Ianuario',
               email: 'yano1978@gmail.com',
               fiscalcode: 'NRIRST78R02E415P',
               province: 'Pesaro',
               phone: '603245336',
               age: 41
           },
           {
               name: 'Ernesto3',
               lastname: 'Ianuario',
               email: 'yano1978@gmail.com',
               fiscalcode: 'NRIRST78R02E415P',
               province: 'Pesaro',
               phone: '603245336',
               age: 41
           },
           {
               name: 'Ernesto4',
               lastname: 'Ianuario',
               email: 'yano1978@gmail.com',
               fiscalcode: 'NRIRST78R02E415P',
               province: 'Pesaro',
               phone: '603245336',
               age: 41
           }
       ];
   }
}

