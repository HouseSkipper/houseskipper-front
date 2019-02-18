import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Skill, SubSkill, User} from '../interfaces/user';
import {environment} from '../../environments/environment';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

    private _backendURL;

    constructor(private _http: HttpClient, private _authentication: AuthenticationService) {
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        // build all backend urls
        Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[ k ] = `${baseUrl}${environment.backend.endpoints[ k ]}`);
    }

    fetchAll(): Observable<Skill[]> {
        return this._http.get<Skill[]>(this._backendURL.allSkills);
    }

    fetchOneSkill(id: string): Observable<Skill> {
        return this._http.get<Skill>(this._backendURL.oneSkill.replace(':idSkill', id));
    }

    update(skill: Skill): Observable<any> {
        return this._http.put<Skill>(this._backendURL.oneSkill.replace(':idSkill', skill.id), skill, this._options());
    }

    private _options(headerList: Object = {}): any {
        return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
    }

    updateSubSkill(subSkill: SubSkill): Observable<any> {
        return this._http.put<SubSkill>(this._backendURL.oneSubSkill.replace(':id', subSkill.id), subSkill, this._options());
    }
}

