import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {INTERLOCUTEUR} from '../interfaces/interlocuteur';

@Injectable({
    providedIn: 'root'
})

export class InterlocuteurService {

    private readonly _backendURL: any;

    constructor(private _http: HttpClient) {
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        // build all backend urls
        Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
    }

    fecthAll(): Observable<INTERLOCUTEUR[]> {
        return this._http.get<INTERLOCUTEUR[]>(this._backendURL.interlocuteur);
    }

}
