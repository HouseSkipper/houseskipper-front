import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../interfaces/user';
import {filter, first, flatMap, map, tap} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {UsersService} from '../services/users.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as $ from 'jquery';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
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
export class SignUpComponent implements OnInit {

    private _fields;
    private _form: FormGroup;
    private _step: string;
    private _stepNum: number;
    private _fieldsFlatten: string[];
    private _errorMsg: string;
    private _invalid: boolean;
    private _roles: string[] = ['Particulier-propriétaire']; // 'Prestataire de services'];
    private readonly _submit$: EventEmitter<any>;
    private _formCodeEmail: FormGroup;
    private _cgu: boolean;
    private _fieldChecked: Map<string, boolean>;


    constructor(private _userService: UsersService, private _router: Router, private _authService: AuthenticationService) {
        this._fieldsFlatten = [];
        this._fieldChecked = new Map();
        this._stepNum = 0;
        this._submit$ = new EventEmitter<any>();
        this._form = this._buildForm();
        this._formCodeEmail = this._buildFormCodeEmail();
    }


    ngOnInit() {
        this._fields = [];
        this._fields.push({title: 'Entity', values: ['firstname', 'lastname']});
        this._fields.push({title: 'Contact', values: ['username', 'telephone']});
        this._fields.push({title: 'Account', values: ['password', 'role']});
        this._fields.push({title: 'Valider', values: ['code']});
        let i = 0;
        this._fields.forEach(value => {
            for (const subfield of value.values) {
                this._fieldsFlatten[i] = subfield;
                i++;
            }
            this._fieldChecked.set(value.title, false);
        });
        this._step = this._fieldsFlatten[0];
        this._cgu = false;
    }

    continue(data: any, codeEmail: any) {
        const index = this._fieldsFlatten.indexOf(this._step);
        this._errorMsg = '';
        if (index <= 5) {
            if (this._form.get(this._step).valid) {
                console.log(this._step + ' a true');
                this._fieldChecked.set(this._step, true);
                if (this._step === 'password') {
                    if (this._form.get('confirmPassword').value === this._form.get('password').value) {
                        this._step = this._fieldsFlatten[index + 1];
                    } else {
                        this._errorMsg = 'Votre mot de passe ne correspond pas';
                    }
                } else if (this._step === 'username') {
                    this._userService.checkExists(this._form.get(this._step).value).subscribe(data => {
                        if (data) {
                            this._errorMsg = 'Cet email est déjà utilisé';
                        } else {
                            this._errorMsg = '';
                            this._step = this._fieldsFlatten[index + 1];
                        }
                    });
                } else {
                    console.log('index:' + index);
                    if (index < 5) {
                        this._step = this._fieldsFlatten[index + 1];
                    } else if (this._form.valid) {
                        this._step = this._fieldsFlatten[index + 1];
                        this.saveUser(data as User);
                    } else {
                        this._errorMsg = 'Des champs sont manquants';
                    }
                }
                if (this.stepNum % 2 === 1) {
                    const $bar = $('.ProgressBar');
                    if ($bar.children('.is-current').length > 0) {
                        $bar.children('.is-current').removeClass('is-current').addClass('is-complete').next().addClass('is-current');
                    } else {
                        $bar.children().first().addClass('is-current');
                    }
                }
                this._stepNum++;
            }
        } else {
            if (this._formCodeEmail.get(this._step).valid) {
                this._userService.checkEmailToken(codeEmail.code).subscribe((_) => {
                        this._authService.loginAfterValidationAccount(_);
                        this._router.navigate(['/']);
                    },
                    (_) => this._errorMsg = _);
            }
        }
    }

    previous(data: any) {
        const index = this._fieldsFlatten.indexOf(this._step);
        console.log('index:' + index);
        if (index > 0) {
            if (this.stepNum % 2 === 0) {

                const $bar = $('.ProgressBar');
                if ($bar.children('.is-current').length > 0) {
                    $bar.children('.is-current').removeClass('is-current').prev().removeClass('is-complete').addClass('is-current');
                } else {
                    $bar.children('.is-complete').last().removeClass('is-complete').addClass('is-current');
                }
            }
            console.log('on est dans la même categorie');
            this._step = this._fieldsFlatten[index - 1];
            this._stepNum--;
            console.log('stepNum:' + this.stepNum);
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
            confirmPassword: new FormControl('', Validators.compose([Validators.required])),
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
            role: new FormControl('Particulier-propriétaire', Validators.required)
        });
    }

    private _buildFormCodeEmail(): FormGroup {
        return new FormGroup({
            code: new FormControl('', Validators.required)
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
                // this._route.navigate(['/']);
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
    get formCodeEmail(): FormGroup {
        return this._formCodeEmail;
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

    get stepNum(): number {
        return this._stepNum;
    }

    get cgu(): boolean {
        return this._cgu;
    }

    set cgu(value: boolean) {
        this._cgu = value;
    }

    check(f: any): boolean {
        if (f.value.title === 'Account') {
            if (this._form.get('confirmPassword').value === this._form.get('password').value && this._form.get('password').valid) {
                return true;
            }
        } else {
            let counter = 0;
            const length = f.value.values.length;
            for (let i = 0; i < length; i++) {
                if (f.value.values[i] !== 'code') {
                    if (this._form.get(f.value.values[i]).valid && this._fieldChecked.get(f.value.values[i])) {
                        counter = counter + 1;
                    }
                }
            }
            return length === counter;
        }
    }
}
