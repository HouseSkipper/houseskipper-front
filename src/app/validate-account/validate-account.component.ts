import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, flatMap} from 'rxjs/operators';
import {UsersService} from '../services/users.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.component.html',
  styleUrls: ['./validate-account.component.css']
})
export class ValidateAccountComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _usersService: UsersService, private _authService: AuthenticationService,
      private _router: Router) { }

  ngOnInit() {
    this._route.params.pipe(
        filter(params => !!params['emailToken']),
        flatMap(params => this._usersService.checkEmailToken(params['emailToken']))
    )
        .subscribe((_) => {
          this._authService.loginAfterValidationAccount(_);
          this._router.navigate(['/']);
        });
  }

}
