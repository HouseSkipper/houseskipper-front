import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { helpTicket } from '../interfaces/helpTicket';


@Component({
    selector: 'app-helpDialog',
    templateUrl: './helpDialog.component.html',
    styleUrls: ['./helpDialog.component.css']
})
export class HelpDialogComponent implements OnInit {

    constructor (private _dialogRef :MatDialogRef<HelpDialogComponent>, @Inject(MAT_DIALOG_DATA) private _ticket :helpTicket)
    {}
    
    ngOnInit () {
    }
    
    
    
    get ticket () :helpTicket {
        return this._ticket;
    }
    
    
    onSave (ticket :helpTicket) {
        this._dialogRef.close(ticket);
    }
    
    onCancel () {
        this._dialogRef.close();
    }

}

