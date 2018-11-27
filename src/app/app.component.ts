import {Component, OnInit} from '@angular/core';
import {User} from './interfaces/user';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'HouseSkipper';

    currentUser: User;

    constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer,
                private _routerService: Router, private _authService: AuthenticationService) {
        this._authService.currentUser.subscribe(u => this.currentUser = u);
    }

    logout() {
        this._authService.logout();
        this._routerService.navigate(['/login']);
    }
    update() {
        this._routerService.navigate(['/update']);
    }

    ngOnInit() {
        this._matIconRegistry.addSvgIcon('icon-menu', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo.svg'));
    }
}
