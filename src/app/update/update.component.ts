import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {UsersService} from '../services/users.service';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  private _model: User;

  constructor(private _userService: UsersService, private _authService: AuthenticationService) { }

  ngOnInit() {
      this._userService.fetchOne(this._authService.currentUserValue.id).subscribe((user: User) => this._model = user);
  }

}
