import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { filter } from 'rxjs/operators';

import { helpTicket } from '../interfaces/helpTicket';
import { HelpDialogComponent } from './helpDialog.component';


@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {


    private _ticket: helpTicket;
    private _dialogRef: MatDialogRef<HelpDialogComponent>;

    constructor (private _dialog: MatDialog) {}

    ngOnInit () {
        this._ticket = {
            subject : '',
            involved : '',
            message : ''
        };
    }



    get ticket (): helpTicket {
        return this._ticket;
    }

    set ticket (value: helpTicket) {
        this._ticket = value;
    }



    missRDV () {
        this._ticket.subject = 'Absence rendez-vous';
        this.showDialog();
    }

    damage () {
        this._ticket.subject = 'Sinistre';
        this.showDialog();
    }

    disagree () {
        this._ticket.subject = 'Désaccord';
        this.showDialog();
    }

    showDialog () {
        this._dialogRef = this._dialog.open(HelpDialogComponent, {disableClose : true});
        this._dialogRef.afterClosed()
        .pipe(
            filter(_ => !!_)
        )
        .subscribe(
            (ticket: helpTicket) => this._ticket = ticket
        );
    }


}

