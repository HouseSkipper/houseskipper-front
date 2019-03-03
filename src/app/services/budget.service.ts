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

    getAll(): Observable<Room[]> {
        console.log(this._backendURL.rooms);
        return this._http.get<Room[]>(this._backendURL.rooms)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    getRoomsByHouse(HouseName: string): Observable<Room[]> {
        return this._http.get<Room[]>(this._backendURL.roomsByHouse.replace('houseName', HouseName))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

}
