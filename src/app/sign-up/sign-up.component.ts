import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {filter, first, flatMap, map, tap} from 'rxjs/operators';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {UsersService} from '../services/users.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as $ from 'jquery';
import {User} from '../interfaces/user';
import {MatStepper} from '@angular/material';
import { signupStep } from '../interfaces/signupStep';

import { SIGNUP_STEPS } from './signup-steps';



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
        ]),
        trigger(
          'fadeInOut', [
            state('void', style({opacity: 0})),
            transition('void <=> *', animate(2000))
          ]
        )
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

    private _fieldIndex;
    private _subFieldIndex;
    private idOK: boolean;

    constructor(private _userService: UsersService, private _router: Router, private _authService: AuthenticationService) {
        this._fieldsFlatten = [];
        this._fieldChecked = new Map();
        this._submit$ = new EventEmitter<User>();
        this._form = this._buildForm();
        this._formCodeEmail = this._buildFormCodeEmail();

        this._fieldIndex = 0;
        this._subFieldIndex = 0;
        this.idOK = false;
    }


    ngOnInit() {
        this._fields = [];
        SIGNUP_STEPS.forEach(_ => this._fields.push(_));

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

        this._stepNum = 0;
        this._errorMsg = '';
    }

    getIndexGroup(step: string) {
        let indexGroup = 0;
        switch (step) {
            case 'Email' :
            case 'Telephone' :
                indexGroup = 1;
                break;
            case 'Motdepasse':
            case 'Role':
            case 'confirmPassword':
                indexGroup = 2;
                break;
            case 'code':
                indexGroup = 3;
                break;
        }
        return indexGroup;
    }

    stepForward () {
        console.log('step forward');
        this._stepNum++;
        this._step = this._fieldsFlatten[this._stepNum];
    }

    // verify step is not at beginning before using this function
    stepBackward () {
        this._stepNum--;
        this._step = this._fieldsFlatten[this._stepNum];
    }

    continue(data: any, codeEmail: any) {
        const index = this._fieldsFlatten.indexOf(this._step);
        const indexGroup = this.getIndexGroup(this._step);
        this._errorMsg = '';
        const formArray = this.form.get('formArray') as FormArray;
        console.log('index : ' + index);
        if (index <= 5) {
            if (formArray.controls[indexGroup].get(this._step).valid) {
                this._fieldChecked.set(this._step, true);
                if (this._step === 'Motdepasse') {
                    if (formArray.controls[indexGroup].get('confirmPassword').value === formArray.controls[indexGroup].get('Motdepasse').value) { // form.get('formArray').controls[0]
                        this.stepForward();
                    } else {
                        this._errorMsg = 'Votre mot de passe ne correspond pas';
                    }
                } else if (this._step === 'Email') {
                    this._userService.checkExists(formArray.controls[indexGroup].get(this._step).value).subscribe(data => { // form.get('formArray').controls[0]
                        if (data) {
                            this._errorMsg = 'Cet email est déjà utilisé';
                        } else {
                            this._errorMsg = '';
                            this.stepForward();
                        }
                    });
                } else {
                    // console.log('entre avant le if form.valid : ' + (this._form.get('formArray').get([0]).valid && this._form.get('formArray').get([1]).valid) && this._form.get('formArray').get([2]).valid);
                    if (this._form.get('formArray').get([0]).valid && this._form.get('formArray').get([1]).valid && this._form.get('formArray').get([2]).valid && index === 5) {
                        console.log('entre envoie donner');
                        this.saveUser(data);
                        this.stepForward();
                    } else {
                        this._errorMsg = 'Des champs sont manquants';
                    }
                }
                if (!!this._errorMsg) {
                    this.stepForward();
                }
            }
        } else {
            console.log('entre vérifier mail');
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
        if (index > 0) {
            this.stepBackward();
        }
    }

    setStep(value: string): void {
        const indexGroup = this.getIndexGroup(value);
        this.stepper.selectedIndex = indexGroup;
        const formArray = this.form.get('formArray') as FormArray;
        if (value === this._fieldsFlatten[0]) {
            this._step = value;
        } else {
            const index = this._fieldsFlatten.indexOf(value);
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


    private _buildForm(): FormGroup { // TODO
        return new FormGroup({
            formArray: new FormArray([
                new FormGroup({
                    Prénom: new FormControl('', Validators.compose([
                        Validators.required, Validators.minLength(3)
                    ])),
                    Nom: new FormControl('', Validators.compose([
                        Validators.required, Validators.minLength(3)
                    ])),
                }),
                new FormGroup({
                    Email: new FormControl('', Validators.compose([
                        Validators.required,
                        Validators.pattern(
                            '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}' +
                            '\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$')
                    ])),
                    Telephone: new FormControl('', Validators.compose([
                        Validators.pattern('\\d{10}')
                    ])),
                }),
                new FormGroup({
                    Motdepasse: new FormControl('', Validators.compose([
                        Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$')
                    ])),
                    confirmPassword: new FormControl('', Validators.compose([Validators.required])),
                    // validator: MustMatch('password', 'confirmPassword'),
                    Role: new FormControl('Particulier-propriétaire', Validators.required)
                }),
                this._buildFormCodeEmail()
            ])
        });
        const formArray = this.form.get('formArray') as FormArray;
        this._formCodeEmail = formArray.at(3) as FormGroup;
    }

    private _buildFormCodeEmail(): FormGroup {
        return new FormGroup({
            code: new FormControl('', Validators.required)
        });
    }

    saveUser(user) {
        let finalUser = {} as User;
        Array.from(user.formArray).forEach(function(elt) {
            finalUser = Object.assign(finalUser, elt);
        });
        of(finalUser)
            .pipe(
                map(_ => {
                        return {
                            'firstname': _.Prénom,
                            'lastname': _.Nom,
                            'password': _.Motdepasse,
                            'username': _.Email,
                            'telephone': _.Telephone,
                            'role': _.Role
                        };
                    }
                ),
                flatMap(_ => this._userService.create(_))
            ).subscribe(
            data => {
                // this._router.navigate(['/']);
            },
            error => {
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
        if (f.value.title === 'Compte') {
            if (formArray.controls[2].get('confirmPassword').value === formArray.controls[2].get('Motdepasse').value && formArray.controls[2].get('Motdepasse').valid) {
                return true;
            }
        } else {
            let counter = 0;
            const length = f.value.values.length;
            for (let i = 0; i < length; i++) {
                if (f.value.values[i] !== 'code') {
                    const indexGroup = this.getIndexGroup(f.value.values[i]);
                    if (formArray.controls[indexGroup].get(f.value.values[i]).valid && this._fieldChecked.get(f.value.values[i])) {
                        counter++;
                    }
                }
            }
            return length === counter;
        }
    }
}
