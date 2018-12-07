import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {House} from '../../interfaces/house';
import {HouseService} from '../../services/house.service';
import {Router} from '@angular/router';

export interface Type {
    value: string;
}


@Component({
    selector: 'app-form-house',
    templateUrl: './form.house.component.html',
    styleUrls: ['./form.house.component.css']
})
export class FormHouseComponent implements OnInit {

    private readonly _form: FormGroup;
    private _step: number;
    private _types: Type[];
    private _studio: boolean;
    rooms: FormArray;

    constructor(private _houseService: HouseService, private _router: Router) {
        this._form = this._buildForm();
        this._step = 0;
        this._types = [
            {value: 'Studio'},
            {value: 'T'},
            {value: 'F'}
        ];
        this._studio = false;
    }

    createItem(p: number): FormGroup {
        return new FormGroup({
            id: new FormControl(p),
            roomName: new FormControl(''),
            space: new FormControl(''),
            description: new FormControl('')
        });
    }


    get step(): number {
        return this._step;
    }

    get types(): Type[] {
        return this._types;
    }

    get studio(): boolean {
        return this._studio;
    }

    deletePiece(p: number) {
        this.rooms = this._form.get('rooms') as FormArray;
        this.rooms.removeAt(p);
    }


    changeType() {
        if ( this._form.value.standardType === 'Studio') {
            this._studio = false;
        } else {
            this._studio = true;
        }
    }

    setStep(index: number) {
        this._step = index;
    }

    nextStep() {
        this._step++;
    }

    prevStep() {
        this._step--;
    }

    ngOnInit() {
    }

    /**
     * Returns private property _form
     */
    get form(): FormGroup {
        return this._form;
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            houseName: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(5)
            ])),
            houseType: new FormControl('', Validators.required),
            address: new FormControl('', Validators.required),
            postalCode: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            livingSpace: new FormControl('', Validators.required),
            outsideSpace: new FormControl('', Validators.required),
            numberPieces: new FormControl('', Validators.required),
            constructionYear: new FormControl('', Validators.required),
            standardType: new FormControl('', Validators.required),
            standardTypeNumber: new FormControl('1', Validators.required),
            rooms: new FormArray([this.createItem(0)]),
            heatingType: new FormControl('', Validators.required),
            amperage: new FormControl('', Validators.required),
            comment: new FormControl(''),
        });
    }

    addItem(): void {
        this.rooms = this._form.get('rooms') as FormArray;
        this.rooms.push(this.createItem(this.rooms.length));
    }


    submit(payload: House) {
        this._houseService.create(payload).subscribe( (_) => this._router.navigate([ '/users/houses']));
    }

}
