import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../interfaces/user';
import {filter, first, flatMap, map, tap} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {UsersService} from '../services/users.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as $ from 'jquery';
import {MatStepper} from '@angular/material';


@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss'],
    animations: [
        trigger('slideInOut', [
            state('in', style({opacity: 1})),
            transition(':leave', [
                animate('200ms ease-in', style({opacity: 0}))
            ]),
            transition(':enter', [
                style({ opacity: 0}),
                animate('600ms ease-in', style({opacity: 1}))
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
    @ViewChild('stepper') stepper: MatStepper;


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

    getIndexGroup(step: string) {
        let indexGroup = 0;
        switch (step) {
            case 'username' :
            case 'telephone' :
                indexGroup = 1;
                break;
            case 'password':
            case 'role':
            case 'confirmPassword':
                indexGroup = 2;
                break;
            case 'code':
                indexGroup = 3;
                break;
        }
        return indexGroup;
    }

    continue(data: any, codeEmail: any) {
        const index = this._fieldsFlatten.indexOf(this._step);
        const indexGroup = this.getIndexGroup(this._step);
        this._errorMsg = '';
        const formArray = this.form.get('formArray') as FormArray;
        if (index <= 5) {
            if (formArray.controls[indexGroup].get(this._step).valid) { // form.get('formArray').controls[0]
                this._fieldChecked.set(this._step, true);
                if (this._step === 'password') {
                    if (formArray.controls[indexGroup].get('confirmPassword').value === formArray.controls[indexGroup].get('password').value) { // form.get('formArray').controls[0]
                        this._step = this._fieldsFlatten[index + 1];
                    } else {
                        this._errorMsg = 'Votre mot de passe ne correspond pas';
                    }
                } else if (this._step === 'username') {
                    this._userService.checkExists(formArray.controls[indexGroup].get(this._step).value).subscribe(data => { // form.get('formArray').controls[0]
                        if (data) {

                            this._errorMsg = 'Cet email est déjà utilisé';
                        } else {
                            this._errorMsg = '';
                            this._step = this._fieldsFlatten[index + 1];
                            console.log(this._step);
                        }
                    });
                } else {
                    console.log('index:' + index);
                    if (index < 5) {
                        this._step = this._fieldsFlatten[index + 1];
                    } else if (this._form.valid) {
                        this._step = this._fieldsFlatten[index + 1];
                        this.saveUser(data);
                    } else {
                        this._errorMsg = 'Des champs sont manquants';
                    }
                }
                /**
                if (this.stepNum % 2 === 1) {
                    const $bar = $('.ProgressBar');
                    if ($bar.children('.is-current').length > 0) {
                        $bar.children('.is-current').removeClass('is-current').addClass('is-complete').next().addClass('is-current');
                    } else {
                        $bar.children().first().addClass('is-current');
                    }
                }
                this._stepNum++;**/
            }
        } else {
            if (this._formCodeEmail.get(this._step).valid) { // form.get('formArray').controls[0]
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
        const indexGroup = this.getIndexGroup(value);
        console.log('indexGroup : ' + indexGroup);
        this.stepper.selectedIndex = indexGroup;
        const formArray = this.form.get('formArray') as FormArray;
        if (value === this._fieldsFlatten[0]) {
            this._step = value;
        } else {
            const index = this._fieldsFlatten.indexOf(value);
            console.log(this._fieldsFlatten[index - 1]);
            console.log(formArray.controls[indexGroup]);
            // indexGroup - 1 si on accède à un title
            if (formArray.controls[indexGroup - 1] != null && formArray.controls[indexGroup - 1].get(this._fieldsFlatten[index - 1]) != null) {
                if (formArray.controls[indexGroup - 1].get(this._fieldsFlatten[index - 1]).valid && this._fieldChecked.get(this._fieldsFlatten[index - 1])) {
                    this._step = value;
                }
            } else {
                if (formArray.controls[indexGroup].get(this._fieldsFlatten[index - 1]).valid && this._fieldChecked.get(this._fieldsFlatten[index - 1])) {
                    this._step = value;
                }
            }

        }
    }


    private _buildForm(): FormGroup {
        return new FormGroup({
            formArray: new FormArray([
                new FormGroup({
                    firstname: new FormControl('', Validators.compose([
                        Validators.required, Validators.minLength(3)
                    ])),
                    lastname: new FormControl('', Validators.compose([
                        Validators.required, Validators.minLength(3)
                    ])),
                }),
                new FormGroup({
                    username: new FormControl('', Validators.compose([
                        Validators.required,
                        Validators.pattern(
                            '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}' +
                            '\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
                    ])),
                    telephone: new FormControl('', Validators.compose([
                        Validators.pattern('\\d{10}')
                    ])),
                }),
                new FormGroup({
                    password: new FormControl('', Validators.compose([
                        Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$')
                    ])),
                    confirmPassword: new FormControl('', Validators.compose([Validators.required])),
                    // validator: MustMatch('password', 'confirmPassword'),
                    role: new FormControl('Particulier-propriétaire', Validators.required)
                }),
                new FormGroup({

                }),
            ])
        });
    }

    private _buildFormCodeEmail(): FormGroup {
        return new FormGroup({
            code: new FormControl('', Validators.required)
        });
    }

    saveUser(user) {
        let finalUser = {} as User;
        Array.from(user.formArray).forEach(function(elt) {
            console.log(elt);
            finalUser = Object.assign(finalUser, elt);
        });
        console.log(finalUser);
        of(finalUser)
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
                // this._router.navigate(['/']);
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
        const formArray = this.form.get('formArray') as FormArray;
        if (f.value.title === 'Account') {
            if (formArray.controls[2].get('confirmPassword').value === formArray.controls[2].get('password').value && formArray.controls[2].get('password').valid) {
                return true;
            }
        } else {
            let counter = 0;
            const length = f.value.values.length;
            for (let i = 0; i < length; i++) {
                if (f.value.values[i] !== 'code') {
                    const indexGroup = this.getIndexGroup(f.value.values[i]);
                    if (formArray.controls[indexGroup].get(f.value.values[i]).valid && this._fieldChecked.get(f.value.values[i])) {
                        counter = counter + 1;
                    }
                }
            }
            return length === counter;
        }
    }
}
