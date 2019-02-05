import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../interfaces/user';
import {AuthenticationService} from '../services/authentication.service';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UsersService} from '../services/users.service';

@Component({
    selector: 'app-check-browser',
    templateUrl: './checkBrowser.component.html',
    styleUrls: ['./checkBrowser.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CheckBrowserComponent implements OnInit {

    private _errorMsg = '';
    private _form: FormGroup;

    get form(): FormGroup {
        return this._form;
    }

    constructor(private _authService: AuthenticationService, private _router: Router, private _userService: UsersService) {
        this._form = this._buildForm();
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            Code: new FormControl('', Validators.required)
        });
    }

    ngOnInit(): void {
    }

    get errorMsg(): string {
        return this._errorMsg;
    }

    submit(codeEmail: any) {
        this._userService.checkEmailToken(codeEmail.Code).subscribe((_) => {
            this._authService.loginAfterValidationAccount(_);
            this._router.navigate(['/']);
        });
    }


}
