import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../interfaces/user';
import {first, flatMap, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {of} from 'rxjs';
import {UsersService} from '../services/users.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


    private _roles: string[] = ['Particulier-propriétaire', 'Prestataire'];

    get roles(): string[] {
        return this._roles;
    }

    private _errorMsg = '';
    private _form: FormGroup;
    private _invalid: boolean;

    get invalid(): boolean {
        return this._invalid;
    }

    private readonly _submit$: EventEmitter<User>;

    get form(): FormGroup {
        return this._form;
    }

    @Output('submit')
    get submit$(): EventEmitter<User> {
        return this._submit$;
    }

    /**
     * Function to emit event to submit form and person
     */
    submit(user: User) {
        of(user)
            .pipe(
                map(_ => {
                    return {'firstname' : _.firstname, 'lastname': _.firstname, 'password' : _.password, 'username' : _.username,
                        'telephone' : _.telephone, 'role': _.role};
                }),
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
            }
        );
    }

    constructor(private _userService: UsersService, private _router: Router) {
        this._submit$ = new EventEmitter<User>();
        this._form = this._buildForm();
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


    get errorMsg(): string {
        if (this._errorMsg === 'Unknown Error') {
            this._errorMsg = 'Server unreachable';
        }
        return this._errorMsg;
    }

    ngOnInit(): void {
    }

}
