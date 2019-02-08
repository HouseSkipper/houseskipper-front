import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Prestataire} from '../interfaces/Prestataire';

@Injectable({
  providedIn: 'root'
})
export class PrestataireService {

  private readonly _backendURL: any;
  constructor(private _httpClient: HttpClient) {
      this._backendURL = {};
      // build backend base url
      let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
      if (environment.backend.port) {
          baseUrl += `:${environment.backend.port}`;
      }

      // build all backend urls
      Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

    create(prestataire: Prestataire): Observable<any> {
        return this._httpClient.post<Prestataire>(this._backendURL.onePrestataire, prestataire, this._options());
    }

    private _options(headerList: Object = {}): any {
        return {headers: new HttpHeaders(Object.assign({'Content-Type': 'application/json'}, headerList))};
    }
}
