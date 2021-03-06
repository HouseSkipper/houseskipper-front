import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from './interfaces/user';
import {AuthenticationService} from './services/authentication.service';
import {NavigationStart, Router} from '@angular/router';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


    constructor(private _matIconRegistry: MatIconRegistry, private _domSanitizer: DomSanitizer, private router: Router) {
    }


    ngOnInit() {
        this._matIconRegistry.addSvgIcon('icon-logo', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/Logo-House-skipper-TEXT.svg'));
        this._matIconRegistry.addSvgIcon('icon-logo-wtext', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/Logo-House-skipper.svg'));
        this._matIconRegistry.addSvgIcon('icon-menu', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/logo.svg'));
        this._matIconRegistry.addSvgIcon('icon-houses', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/house.svg'));
        this._matIconRegistry.addSvgIcon('icon-maps', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/maps-and-flags.svg'));
        this._matIconRegistry.addSvgIcon('icon-info', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/information.svg'));
        this._matIconRegistry.addSvgIcon('icon-door', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/door.svg'));
        this._matIconRegistry.addSvgIcon('icon-add', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/add.svg'));
        this._matIconRegistry.addSvgIcon('icon-delete', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/delete.svg'));
        this._matIconRegistry.addSvgIcon('icon-energy', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/energy.svg'));
        this._matIconRegistry.addSvgIcon('icon-message', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/message.svg'));
        this._matIconRegistry.addSvgIcon('icon-tree', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/tree.svg'));
        this._matIconRegistry.addSvgIcon('icon-gros-oeuvres', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/brick-wall.svg'));
        this._matIconRegistry.addSvgIcon('icon-seconds-oeuvres', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/hammer.svg'));
        this._matIconRegistry.addSvgIcon('icon-bricolage', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/toolbox.svg'));
        this._matIconRegistry.addSvgIcon('icon-jardinage', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/watering-can.svg'));
        this._matIconRegistry.addSvgIcon('icon-paysage', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/forest.svg'));
        this._matIconRegistry.addSvgIcon('icon-edit', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/edit.svg'));
        this._matIconRegistry.addSvgIcon('icon-en', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/en.svg'));
        this._matIconRegistry.addSvgIcon('icon-fr', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/fr.svg'));
        this._matIconRegistry.addSvgIcon('icon-logo-plat', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/Logo-House-Skipper-long.svg'));
        this._matIconRegistry.addSvgIcon('icon-checked', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/checked.svg'));
        this._matIconRegistry.addSvgIcon('icon-OrangeChecked', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/orangeChecked.svg'));
        this._matIconRegistry.addSvgIcon('icon-error', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/error.svg'));
        this._matIconRegistry.addSvgIcon('icon-doc', this._domSanitizer.bypassSecurityTrustResourceUrl('/assets/images/copy.svg'));
    }

}
