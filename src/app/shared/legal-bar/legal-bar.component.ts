import {Component, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';


@Component({
    selector: 'app-legal-bar',
    templateUrl: './legal-bar.component.html',
    styleUrls: ['./legal-bar.component.css']
})
export class LegalBarComponent implements OnInit {


    cookies_consent: boolean;


    constructor (private cookieService: CookieService) {
        this.cookies_consent = false;
    }



    ngOnInit () {
        if (this.cookieService.check('cookieConsent')) {
            if (this.cookieService.get('cookieConsent') == 'YES') {
                this.cookies_consent = true;
            }
        }
    }



    accept () {
        this.cookies_consent = true;
        this.cookieService.set('cookieConsent', 'YES');
    }

}
