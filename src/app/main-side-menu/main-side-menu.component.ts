import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MenuListService} from '../services/menu/menu-list.service';
import {MainMenuListService} from '../services/menu/main-menu-list.service';

@Component({
    selector: 'app-main-side-menu',
    templateUrl: './main-side-menu.component.html',
    styleUrls: ['./main-side-menu.component.css'],
    providers: [
        { provide: MenuListService, useClass: MainMenuListService }
    ]
})
export class MainSideMenuComponent implements OnInit {

    private _fields;
    private _step;
    private readonly _setStep$: EventEmitter<string>;

    constructor(private menuListService: MainMenuListService) {
        this._setStep$ = new EventEmitter<string>();
    }

    setStep(field) {
        this._step = field;
        this._setStep$.emit(field);
    }


    @Output('setStep')
    get setStep$(): EventEmitter<string> {
        return this._setStep$;
    }

    ngOnInit() {
        this._fields = this.menuListService.getFields();
        this._step = this._fields[0].title;
    }

    @Output()
    get fields() {
        return this._fields;
    }

    @Output()
    get step() {
        return this._step;
    }
}
