import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataaService {

  url = '//localhost:8080';
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
        return this.http.get(this.url + '/Tasks');
  }

    get(id: string) {
        return this.http.get(this.url + '/' + id);
    }

    save(task: any): Observable<any> {
        let result: Observable<Object>;
        if (task['href']) {
            result = this.http.put(task.href, task);
        } else {
            result = this.http.post(this.url, task);
        }
        return result;
    }

    remove(href: string) {
        return this.http.delete(href);
    }
}
