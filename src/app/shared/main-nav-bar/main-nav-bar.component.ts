import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-nav-bar',
  templateUrl: './main-nav-bar.component.html',
  styleUrls: ['./main-nav-bar.component.css']
})
export class MainNavBarComponent implements OnInit {

  private _currentUser: User;
  private _title = 'HouseSkipper';

  constructor(private _authService: AuthenticationService, private _routerService: Router) {
      this._authService.currentUser.subscribe(u => this.currentUser = u);
  }


  ngOnInit() {
  }

    logout() {
        this._authService.logout();
        this._routerService.navigate(['/login']);
    }
    update() {
        this._routerService.navigate(['/update']);
    }


    get currentUser(): User {
        return this._currentUser;
    }

    set currentUser(value: User) {
        this._currentUser = value;
    }


    get title(): string {
        return this._title;
    }
}
