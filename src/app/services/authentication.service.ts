import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private _backendURL;
    private _currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private _http: HttpClient) {
        this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this._currentUserSubject.asObservable();

        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }
        console.log('environment :' + baseUrl);
        // build all backend urls
        Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
    }

    public get currentUserValue(): User {
        return this._currentUserSubject.value;

    }

    login(username: string, password: string) {
        return this._http.post<any>(this._backendURL.authenticate, {username: username, password: password})
            .pipe(
                map(user => {
                    console.log(user);
                    if (user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        this._currentUserSubject.next(user);
                    }
                    return user;
                })
            );
    }

    loginAfterValidationAccount(user: User) {
        if (user && user.token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this._currentUserSubject.next(user);
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this._currentUserSubject.next(null);
    }
}
