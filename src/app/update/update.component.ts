import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User} from '../interfaces/user';
import {UsersService} from '../services/users.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as $ from 'jquery';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.css'],
    animations: [
        trigger('slideInOut', [
            state('in', style({opacity: 1})),
            transition(':leave', [
                animate('200ms ease-in', style({transform: 'translateX(+100%)', opacity: 0}))
            ]),
            transition(':enter', [
                style({transform: 'translateX(100%)', opacity: 0}),
                animate('600ms ease-in', style({transform: 'translateX(0%)'}))
            ])
        ])
    ]
})
export class UpdateComponent implements OnInit, OnChanges {

    private _model: User;
    private _modif: boolean;

    private _fields;
    private _form: FormGroup;
    private _step: string;
    private _fieldsFlatten: string[];
    private _errorMsg: string;
    private _invalid: boolean;
    private _roles: string[] = ['Particulier-propriétaire']; // 'Prestataire de services'];
    private readonly _submit$: EventEmitter<any>;
    private _cgu: boolean;

    constructor(private _userService: UsersService, private _authService: AuthenticationService, private _router: Router) {
        this._fieldsFlatten = [];
        this._submit$ = new EventEmitter<any>();
        this._form = this._buildForm();

    }

    ngOnInit() {
        this._fields = [];
        this._fields.push({title: 'Entité', values: ['firstname', 'lastname']});
        this._fields.push({title: 'Contact', values: ['username', 'telephone']});
        this._fields.push({title: 'Compte', values: ['role']});
        let i = 0;
        this._fields.forEach(value => {
            for (const subfield of value.values) {
                this._fieldsFlatten[i] = subfield;
                i++;
            }
        });
        this._step = this._fieldsFlatten[0];
        this._cgu = false;

        this._model = this._authService.currentUserValue;
        this._modif = false;
    }

    ngOnChanges(record) {
        console.log('ngOnChange');
        this._form.patchValue(record.model.currentValue);
    }

    modifInfo(): any {
        // this._router.navigate(['/signup']);
        this._modif = !this._modif;
    }

    modifMotDePasse(): any {

    }

    terminer(data: any): any {
        //this.saveUser(data as User);
        this.modifInfo();
    }

    continue(data: any) {
        const index = this._fieldsFlatten.indexOf(this._step);
        this._errorMsg = '';
        if (index <= 5) {
            if (this._form.get(this._step).valid) {
                console.log('index:' + index);
                if (index < 5) {
                    console.log('on est dans la même categorie');
                    this._step = this._fieldsFlatten[index + 1];
                } else if (this._form.valid) {
                    this._step = this._fieldsFlatten[index + 1];
                    this.saveUser(data as User);
                } else {
                    this._errorMsg = 'Des champs sont manquants';
                }
            }
        }
    }

    previous(data: any) {
        const index = this._fieldsFlatten.indexOf(this._step);
        console.log('index:' + index);
        if (index > 0) {
            console.log('on est dans la même categorie');
            this._step = this._fieldsFlatten[index - 1];
        }

    }

    setStep(value: string): void {
        console.log(value);
        if (value === this._fieldsFlatten[0]) {
            this._step = value;
        } else {
            const index = this._fieldsFlatten.indexOf(value);
            if (this._form.get(this._fieldsFlatten[index - 1]).valid) {
                this._step = value;
            }
        }
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            firstname: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            lastname: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            username: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern(
                    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}' +
                    '\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
            ])),
            telephone: new FormControl('', Validators.compose([
                Validators.pattern('\\d{10}')
            ])),
            role: new FormControl('Particulier-propriétaire', Validators.required)
        });
    }

    saveUser(user: User) {
        of(user)
            .pipe(
                map(_ => {
                        return {
                            'firstname': _.firstname,
                            'lastname': _.lastname,
                            'password': _.password,
                            'username': _.username,
                            'telephone': _.telephone,
                            'role': _.role
                        };
                    }
                ),
                flatMap(_ => this._userService.update(_))
            ).subscribe(
            data => {
                console.log(data);
                // this._router.navigate(['/']);
            },
            error => {
                console.log(error);
                this._errorMsg = error;
                this._invalid = true;
            });
    }

    check(f: any): boolean {
        let counter = 0;
        const length = f.value.values.length;
        for (let i = 0; i < length; i++) {
            // console.log(f.value.values[i]);
            if (f.value.values[i] !== 'code') {
                if (this._form.get(f.value.values[i]).valid) {
                    counter = counter + 1;
                }
            }
        }
        return length === counter;
    }

    get model(): User {
        return this._model;
    }

    get modif(): boolean {
        return this._modif;
    }

    get roles(): string[] {
        return this._roles;
    }

    @Output('submit')
    get submit$(): EventEmitter<User> {
        return this._submit$;
    }

    @Output()
    get form(): FormGroup {
        return this._form;
    }

    set form(value: FormGroup) {
        this._form = value;
    }

    @Output()
    get step(): string {
        return this._step;
    }


    set step(value: string) {
        this._step = value;
    }

    get fields(): any {
        return this._fields;
    }

    @Input()
    set fields(value: any) {
        this._fields = value;
    }


    get errorMsg(): string {
        if (this._errorMsg === 'Unknown Error') {
            this._errorMsg = 'Le serveur n\'est pas up';
        }
        return this._errorMsg;
    }

    get cgu(): boolean {
        return this._cgu;
    }

    set cgu(value: boolean) {
        this._cgu = value;
    }

}
