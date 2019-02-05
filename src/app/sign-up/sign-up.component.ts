import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../interfaces/user';
import {filter, first, flatMap, map, tap} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {UsersService} from '../services/users.service';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    animations: [
        trigger('slideInOut', [
            transition(':leave', [
                animate('400ms ease-in', style({transform: 'translateX(-100%)'}))
            ]),
            transition(':enter', [
                style({transform: 'translateX(-100%)'}),
                animate('400ms ease-in', style({transform: 'translateX(0%)'}))
            ])
        ])
    ]
})
export class SignUpComponent implements OnInit {

    private _fields;
    private _form: FormGroup;
    private _step: string;
    private _stepNum: number;
    private _fieldsFlatten: string[];
    private _errorMsg: string;
    private _invalid: boolean;
    private _roles: string[] = ['Particulier-propriétaire', 'Prestataire de services'];
    private readonly _submit$: EventEmitter<any>;



    constructor(private _userService: UsersService, private _router: Router) {
        this._fieldsFlatten = [];
        this._stepNum = 0;
        this._submit$ = new EventEmitter<any>();
        this._form = this._buildForm();
    }

    ngOnInit() {
        this._fields = [];
        this._fields.push({title: 'Entity', values: ['Firstname', 'Lastname']});
        this._fields.push({title: 'Contact', values: ['Username', 'Telephone']});
        this._fields.push({title: 'Account', values: ['Password', 'Role']});
        let i = 0;
        this._fields.forEach(value => {
            for (const subfield of value.values) {
                this._fieldsFlatten[i] = subfield;
                i++;
            }
        });
        console.log(this._fieldsFlatten);
        this._step = this._fieldsFlatten[0];
    }

    continue(data: any) {
        if (this._form.get(this._step).valid) {
            const index = this._fieldsFlatten.indexOf(this._step);
            console.log('index:' + index);
            if (index < this._fieldsFlatten.length - 1) {
                console.log('on est dans la même categorie');
                this._step = this._fieldsFlatten[index + 1];
            } else {
                this.saveUser(data as User);
            }
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
            password: new FormControl('', Validators.compose([
                Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$')
            ])),
            confirmPassword: new FormControl('', Validators.required),
            username: new FormControl('', Validators.compose([
                Validators.required,
                Validators.pattern(
                    '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}' +
                    '\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
            ])),
            telephone: new FormControl('', Validators.compose([
                Validators.pattern('\\d{10}')
            ])),
            // validator: MustMatch('password', 'confirmPassword'),
            role: new FormControl('', Validators.required)
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
                flatMap(_ => this._userService.create(_))
            ).subscribe(
            data => {
                console.log(data);
                this._router.navigate(['/']);
            },
            error => {
                console.log(error);
                this._errorMsg = error;
                this._invalid = true;
            });
    }

    /*init(config: any) {
        this.fields(config.fields);
        let i = 0;
        this._fields.forEach(key => {
            for (const subfield of key.values) {
                this._fieldsFlatten[i] = subfield;
                i++;
            }
        });
        this._step = this._fieldsFlatten[0];
        this._form = config.form;
        console.log(this._fieldsFlatten);
    }*/


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
        return this._errorMsg;
    }
}
