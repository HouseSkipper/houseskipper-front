import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {House} from '../interfaces/house';
import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';

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
        if (user !== null) {
            house.username = this._authentication.currentUserValue.username;
        }
        return this._httpClient.post<House>(this._backendURL.addHouse, house, this._options());
    }

    fecthAllHouse(): Observable<any> {
        return this._httpClient.get<House[]>(this._backendURL.allHouses.
        replace(':username', this._authentication.currentUserValue.username))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    remove(id: string) {
        const http = this._backendURL.removeHouse.replace(':houseId', id).replace(':username', this._authentication.currentUserValue.username);
        console.log(http);
        return this._httpClient.delete(http)
            .pipe(
                map(_ => id)
            );
    }

}
