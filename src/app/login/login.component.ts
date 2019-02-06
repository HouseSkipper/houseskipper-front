import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../interfaces/user';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    encapsulation: ViewEncapsulation.None
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
        this._authService.login(user.username, user.password)
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
            username: new FormControl(),
            password: new FormControl()
        });
    }

    ngOnInit() {
        this._authService.logout();
    }

    get errorMsg(): string {
        if (this._errorMsg === 'Unknown Error') {
            this._errorMsg = 'Le serveur n\'est pas up';
        } else if (this._errorMsg === 'Nouvel endroit') {
            this._router.navigate(['/validateAccountBrowser']);
        }
        return this._errorMsg;
    }
}
