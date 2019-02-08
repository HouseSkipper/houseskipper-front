import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Skill, User} from '../interfaces/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {defaultIfEmpty, filter} from 'rxjs/operators';
import {Shortcut} from '../interfaces/shortcuts';

@Injectable({
    providedIn: 'root'
})
export class ShortcutsService {

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

    fetchAll(): Observable<Shortcut[]> {
        return this._http.get<Shortcut[]>(this._backendURL.allShortcuts);
    }

    /**
     * Function to return one shortcut for current id
     */
    fetchOne(id: string): Observable<Shortcut> {
        return this._http.get<Shortcut>(this._backendURL.oneShortcut.replace(':id', id));
    }

    /**
     * Function to create a new shortcut
     */
    create(shortcut: Shortcut): Observable<any> {
        return this._http.post<Shortcut>(this._backendURL.addShortcut, shortcut, this._options());
    }

    /**
     * Function to update a shortcut
     */
    update(shortcut: Shortcut): Observable<any> {
        return this._http.put<Shortcut>(this._backendURL.oneShortcut.replace(':id', shortcut.id), shortcut, this._options());
    }

    /**
     * Function to return request options
     */
    private _options(headerList: Object = {}): any {
        return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
    }
}
