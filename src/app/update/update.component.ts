import { Component, OnInit } from '@angular/core';
import {User} from '../interfaces/user';
import {UsersService} from '../services/users.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  private _model: User;

  constructor(private _userService: UsersService) { }

  ngOnInit() {
      this._userService.fetchOne().subscribe((user: User) => this._model = user);
  }

}
