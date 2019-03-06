import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileHouse, House} from '../interfaces/house';
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
        return this._httpClient.post<House>(this._backendURL.addHouse, house, this._options());
    }

    fecthAllHouse(): Observable<any> {
        return this._httpClient.get<House[]>(this._backendURL.allHouses)
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    fetchHouse(id: string): Observable<any> {
        return this._httpClient.get<House>(this._backendURL.removeHouse.replace(':houseId', id));
    }

    remove(id: string): Observable<any> {
        return this._httpClient.delete(this._backendURL.removeHouse.replace(':houseId', id)).pipe(
            map(_ => id)
        );
    }

    modifier(house: House): Observable<any> {
        return this._httpClient.put<House>(this._backendURL.removeHouse.replace(':houseId', house.id), house, this._options());
    }

    uploadFile(payload: FormData, id: string): Observable<any> {
        // return this._httpClient.post(this._backendURL.uploadFileHouse.replace(':houseId', 1), file, this._options());
        const req = new HttpRequest('POST', this._backendURL.uploadFileHouse.replace(':houseId', id), payload, {
            reportProgress: true,
            responseType: 'text'
        });

        return this._httpClient.request(req);
    }

    fetchFiles(id: string): Observable<FileHouse[]> {
        return this._httpClient.get<FileHouse[]>(this._backendURL.uploadFileHouse.replace(':houseId', id));
    }


    fetchFile(id: string): Observable<any> {
        return this._httpClient.get(this._backendURL.fileHouse.replace(':id', id), { responseType : 'arraybuffer'});
    }



}
