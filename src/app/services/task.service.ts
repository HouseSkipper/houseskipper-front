import { Injectable } from '@angular/core';
import {Task} from '../interfaces/task';
import {Observable, of} from 'rxjs';
import {defaultIfEmpty, filter} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Room} from '../interfaces/house';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    private readonly _backendURL: any;
    ELEMENT_DATA: Task[] = [
        {start_date: new Date(), room: 'Salon', description: 'refaire la painture',
            budget: '500 Euros', status: 'En cours', username: 'admin'},
        {start_date: new Date(), room: 'Bain', description: 'changer le sanitaire',
            budget: '500 Euros', status: 'En cours', username: 'admin' },
        {start_date: new Date(), room: 'Hall', description: 'refaire la painture',
            budget: '500 Euros', status: 'En cours', username: 'admin' },
    ];
    budgets = [
        {value: '< 200 euros', viewValue: '< 200 euros'},
        {value: '300 euros', viewValue: '300 euros'},
        {value: '400 euros', viewValue: '400 euros'},
        {value: '500 euros', viewValue: '500 euros'},
        {value: '800 euros', viewValue: '800 euros'},
        {value: '> 800 euros', viewValue: '> 800 euros'},
    ];
    constructor(private _http: HttpClient) {

        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        // build all backend urls
        Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] =
            `${baseUrl}${environment.backend.endpoints[ k ]}`);

    }

    getBudgets() {
        return this.budgets;
    }

    getAll(): Observable<Room[]> {
        console.log(this._backendURL.rooms);
        return this._http.get<Room[]>(this._backendURL.rooms)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

}
