import {Component, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {User} from '../interfaces/user';
import {BeforeLoginDialogComponent} from '../before-login-dialog/before-login-dialog.component';

@Component({
  selector: 'app-prestataire.login',
  templateUrl: './prestataire-login.component.html',
  styleUrls: ['./prestataire-login.component.css']
})
export class PrestataireLoginComponent implements OnInit {

    private _errorMsg = '';
    private _form: FormGroup;

    constructor(private _authService: AuthenticationService, private _router: Router, private _dialog: MatDialog) {
        this._form = this._buildForm();
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
    }

    openChoiceModal() {
        const dialogRef = this._dialog.open(BeforeLoginDialogComponent);
    }

    get form(): FormGroup {
        return this._form;
    }

    get errorMsg(): string {
      return this._errorMsg;
    }

    submit(){}

  ngOnInit() {
  }

}
