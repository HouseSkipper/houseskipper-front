import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Room} from '../interfaces/house';
import {defaultIfEmpty, filter} from 'rxjs/operators';
import {Phase} from '../interfaces/phase';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

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


    getAll(): Observable<Phase[]> {
        return this._http.get<Phase[]>(this._backendURL.phases)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }
}
