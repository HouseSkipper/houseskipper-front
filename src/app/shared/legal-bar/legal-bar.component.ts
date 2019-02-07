import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-legal-bar',
    templateUrl: './legal-bar.component.html',
    styleUrls: ['./legal-bar.component.css']
})
export class LegalBarComponent implements OnInit
{


    cookies_consent :boolean;

    constructor ()
    {}

    ngOnInit ()
    {
        this.cookies_consent = false;
    }



    accept ()
    {
        this.cookies_consent = true;
    }

}
