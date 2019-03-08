import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {defaultIfEmpty, filter} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

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

    /**
     * Function to return one person for current id
     */
    fetchOne(username: string): Observable<User> {
        return this._http.get<User>(this._backendURL.oneUsers.replace(':username', username));
    }

    checkExists(email: string) {
        return this._http.post<boolean>(this._backendURL.exists, {'username' : email}, this._options());
    }

    /*fetch(): Observable<User[]> {
        return this._http.get<User[]>(this._backendURL.allUsers)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }*/

    /**
     * Function to create a new person
     */
    create(user: User): Observable<any> {
        return this._http.post<User>(this._backendURL.signup, user, this._options());
    }

    checkEmailToken(emailToken: string) {
        return this._http.get<User>(this._backendURL.validateAccount.replace(':emailToken', emailToken));
    }

    update(user: User): Observable<any> {
        return this._http.put<User>(this._backendURL.updateUsers.replace(), user, this._options());
    }

    /**
     * Function to return request options
     */
    private _options(headerList: Object = {}): any {
        return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
    }


}
