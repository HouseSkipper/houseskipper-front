import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {User} from '../interfaces/user';
import {UsersService} from '../services/users.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
        this._model = this._authService.currentUserValue;
        this._modif = false;
        this._form.patchValue(this._model);
    }

    ngOnChanges() {
        this._form.patchValue(this._model);
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

    saveUser(user : User) {
        this._userService.update(user).subscribe((_: User) => this._authService.setCurrentUser(_), null, () => this.ngOnInit());
    }

    check(item: number): number {
        let counter = 0;
        switch (item) {
            case 0 :
                if (this._form.get('lastname').valid && this._form.get('firstname').valid) {
                    counter = 2;
                }
                break;
            case 1 :
                if (this._form.get('username').valid && this._form.get('telephone').valid) {
                    counter = 2;
                }
                break;
            case 2 :
                if (this._form.get('role').valid) {
                    counter = 2;
                }
                break;
            case 3 :
                counter = 2;
                break;
            case 4 :
                counter = 2
                break;
        }
        return counter;
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
