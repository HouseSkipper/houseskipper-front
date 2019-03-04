import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Phase} from '../interfaces/phase';
import {defaultIfEmpty, filter} from 'rxjs/operators';
import {Historic} from '../interfaces/historic';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class HistoricService {

    private readonly _backendURL: any;

    constructor(private _http: HttpClient) {

        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        // build all backend urls
        Object.keys(environment.backend.endpoints.historic).forEach(k => this._backendURL[ k ] =
            `${baseUrl}${environment.backend.endpoints.historic[ k ]}`);
    }


    getAllFromUser(): Observable<Historic[]> {
        console.log(this._backendURL.getHistoricByUser);
        return this._http.get<Historic[]>(this._backendURL.getHistoricByUser)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    getMonthFromUser(): Observable<Historic[]> {
      const d = new Date();
        return this._http.get<Historic[]>(this._backendURL.getHistoricByUserByMonth)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    getYearFromUser(): Observable<Historic[]> {
        const d = new Date();
        return this._http.get<Historic[]>(this._backendURL.getHistoricByUserByYear)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }
}
