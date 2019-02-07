import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {defaultIfEmpty, filter, map} from 'rxjs/operators';
import {Task} from '../interfaces/task';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DataaService {
  // private property to store all backend URLs
  private readonly _backendURL: any;

  constructor(private _http: HttpClient, private _authentication: AuthenticationService) {

    this._backendURL = {};

    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints.tasks).forEach(k => this._backendURL[ k ] =
        `${baseUrl}${environment.backend.endpoints.tasks[ k ]}`);

  }

  getAll(): Observable<Task[]> {
      return this._http.get<Task[]>(this._backendURL.allTasks.
      replace(':username', this._authentication.currentUserValue.username))
      .pipe(
        filter(_ => !!_),
        defaultIfEmpty([])
      );
  }
    get(id: string) {
      return this._http.get<Task>(this._backendURL.oneTask.replace(':id', id));
    }

    create(task: Task): Observable<any> {
      const user = this._authentication.currentUserValue;
      console.log(task.description);
        if (user !== null) {
            task.username = this._authentication.currentUserValue.username;
        } else {
            task.username = 'admin';
        }
      return this._http.post<Task>(this._backendURL.allTasks, task, this._options());
    }

    update(task: Task): Observable<any> {
        const user = this._authentication.currentUserValue;
        if (user !== null) {
            task.username = this._authentication.currentUserValue.username;
        } else {
            task.username = 'admin';
        }
      return this._http.put<Task>(this._backendURL.oneTask.replace(':id', task.id), task, this._options());
    }

    remove(id: string) {
      return this._http.delete(this._backendURL.oneTask.replace(':id', id))
        .pipe(
          map(_ => id)
        );
    }

    getFiles(id): Observable<string[]> {
      console.log(id + 'getfiles');
        return this._http.get<string[]>(this._backendURL.fileNames.replace(':id', id)
            .replace(':username', this._authentication.currentUserValue.username))
            .pipe(
                filter(_ => !!_),
                defaultIfEmpty([])
            );
    }

    downloadFileNow(fileName, id): Observable<any> {
        return this._http.get(this._backendURL.dowload.replace(':fileName', fileName)
            .replace(':username', this._authentication.currentUserValue.username)
                .replace(':id', id)
            , { responseType : 'arraybuffer'});
    }

  private _options(headerList: Object = {}): any {
    return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
  }
}
