import { Injectable } from '@angular/core';
import {Task} from '../interfaces/Task';
import {Observable, of} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    ELEMENT_DATA: Task[] = [
        {start_date: new Date(), room: 'Salon', description: 'refaire la painture', budget: '500 Euros', status: 'En cours'},
        {start_date: new Date(), room: 'Bain', description: 'changer le sanitaire', budget: '500 Euros', status: 'En cours' },
        {start_date: new Date(), room: 'Hall', description: 'refaire la painture', budget: '500 Euros', status: 'En cours' },
    ];
    budgets = [
        {value: '> 200 euros', viewValue: '> 200 euros'},
        {value: '300 euros', viewValue: '300 euros'},
        {value: '400 euros', viewValue: '400 euros'},
        {value: '500 euros', viewValue: '500 euros'},
        {value: '800 euros', viewValue: '800 euros'},
        {value: '< 800 euros', viewValue: '< 800 euros'},
    ];
    constructor() { }


    getData(): Observable<Task[]> {
        return of<Task[]>(this.ELEMENT_DATA);
    }

    getBudgets() {
        return this.budgets;
    }

    addPost(data) {
        this.ELEMENT_DATA.push(data);
    }

    deleteTask(index) {
        this.ELEMENT_DATA = this.ELEMENT_DATA.splice(index, 1);
    }

    dataLength() {
        return this.ELEMENT_DATA.length;
    }
}
