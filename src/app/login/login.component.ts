import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../interfaces/user';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


    private _errorMsg = '';
    private _form: FormGroup;
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
        this._authService.login(user.email, user.password)
            .pipe(first())
            .subscribe(
                data => {
                    this._router.navigate(['/']);
                },
                error => {
                    this._errorMsg = error;
                }
            )
        this._submit$.emit(user);
    }

    constructor(private _authService: AuthenticationService, private _router: Router) {
        this._submit$ = new EventEmitter<User>();
        this._form = this._buildForm();
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            email: new FormControl('', Validators.compose([
                Validators.required
            ])),
            password: new FormControl('', Validators.compose([
                Validators.required
            ]))
        });
    }

    ngOnInit() {
        this._authService.logout();
    }

    get errorMsg(): string {
        return this._errorMsg;
    }
}
