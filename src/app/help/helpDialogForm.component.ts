import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { helpTicket } from '../interfaces/helpTicket';


@Component({
    selector: 'app-helpDialogForm',
    templateUrl: './helpDialogForm.component.html',
    styleUrls: ['./helpDialogForm.component.css']
})
export class HelpDialogFormComponent implements OnInit, OnChanges {


    private _ticket: helpTicket;

    private readonly _form: FormGroup;
    private readonly _submit$: EventEmitter<helpTicket>;
    private readonly _cancel$: EventEmitter<void>;

    constructor () {
        this._submit$ = new EventEmitter<helpTicket>();
        this._cancel$ = new EventEmitter<void>();
        this._form = this._buildForm();
    }

    ngOnInit () {
    }



    get ticket (): helpTicket {
        return this._ticket;
    }

    get form (): FormGroup {
        return this._form;
    }

    @Input()
    set ticket (ticket: helpTicket) {
        this._ticket = ticket;
    }

    @Output('submit')
    get submit$ (): EventEmitter<helpTicket> {
        return this._submit$;
    }

    @Output('cancel')
    get cancel$ (): EventEmitter<void> {
        return this._cancel$;
    }



    ngOnChanges (data) {
        if (data.ticket && data.ticket.currentValue) {
            this._ticket = data.ticket.currentValue;
            this._form.patchValue(this._ticket);
        } else {
            this._ticket = {
                subject : '',
                involved : '',
                message : ''
            };
        }
    }



    private _buildForm (): FormGroup {
        return new FormGroup({
            involved : new FormControl('', Validators.required),
            message : new FormControl('', Validators.required)
        });
    }

    cancel () {
        this._cancel$.emit();
    }

    submit(ticket: helpTicket) {
        this._submit$.emit(ticket);
    }

}

