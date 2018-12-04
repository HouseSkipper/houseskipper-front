import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {House} from '../interfaces/house';
import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class HouseService {

    // private property to store all backend URLs
    private readonly _backendURL: any;

    constructor(private _httpClient: HttpClient, private _authentication: AuthenticationService) {

        this._backendURL = {};
        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        // build all backend urls
        Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
    }

    /**
     * Function to return request options
     */
    private _options(headerList: Object = {}): any {
        return {headers: new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList))};
    }

    create(house: House): Observable<any> {
        const user = this._authentication.currentUserValue;
        console.log(user);
        if (user !== null) {
            house.username = this._authentication.currentUserValue.id;
        } else {
            house.username = 'admin';
        }
        console.log(house);
        return this._httpClient.post<House>(this._backendURL.allHouses, house, this._options());
    }

}
