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
        this.showDialog('Absence rendez-vous');
    }

    damage () {
        this.showDialog('Sinistre');
    }

    disagree () {
        this.showDialog('Désaccord');
    }

    showDialog (subject :string) {
        this._dialogRef = this._dialog.open(HelpDialogComponent, {disableClose : true, data:{involved:'',subject:subject}});
        this._dialogRef.afterClosed()
        .pipe(
            filter(_ => !!_)
        )
        .subscribe(
            (ticket: helpTicket) => this._ticket = ticket
        );
    }


}

