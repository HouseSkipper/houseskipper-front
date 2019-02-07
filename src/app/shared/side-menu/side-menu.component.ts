import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {

    private _fields;
    private _step;
    private readonly _setStep$: EventEmitter<string>;

    constructor() {
        this._setStep$ = new EventEmitter<string>();
    }

    setStep(field) {
        this._setStep$.emit(field);
    }

    @Output('setStep')
    get setStep$(): EventEmitter<string> {
        return this._setStep$;
    }

    fieldContains(element: string): boolean {
        let res = false;
        this._fields.forEach(_ => {
            if (_.title === this._step) {
                if (_.values.indexOf(element) > -1) {
                    res = true;
                }
            } else {
                if (_.values.indexOf(this._step) > -1) {
                    res = true;
                }
            }
        });
        return res;
    }

    ngOnInit() {
    }

    @Input()
    set fields(value) {
        this._fields = value;
    }

    get fields() {
        return this._fields;
    }


    get step() {
        return this._step;
    }

    @Input()
    set step(value) {
        this._step = value;
    }
}
