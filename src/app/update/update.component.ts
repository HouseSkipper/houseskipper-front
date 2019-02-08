import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {UsersService} from '../services/users.service';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  private _model: User;

  constructor(private _userService: UsersService, private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit() {
      this._model = this._authService.currentUserValue;
  }

  get model(): User {
    return this._model;
  }

  modifInfo(): any {
    //this._router.navigate(['/signup']);
  }

  modifMotDePasse(): any {

  }

  get model(): User {
    return this._model;
  }

  openDialog(): any {

  }

}
