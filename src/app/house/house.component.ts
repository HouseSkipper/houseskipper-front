import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {$} from 'protractor';

export interface Type {
    value: string;
}

export interface Piece {
    id: string;
    nom: string;
    surface: number;
    description: string;
}

@Component({
    selector: 'app-house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

    private readonly _form: FormGroup;
    private _step: number;
    private _types: Type[];
    private _studio: boolean;
    private _pieces: Piece[];

    constructor() {
        this._form = this._buildForm();
        this._step = 0;
        this._types = [
            {value: 'Studio'},
            {value: 'T'},
            {value: 'F'}
        ];
        this._studio = false;
        this._pieces = [];
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

    get pieces(): Piece[] {
        return this._pieces;
    }

    addPiece() {
        this._pieces.push(
            {
                id: this._pieces.length.toString(),
                nom: '',
                surface: 0,
                description: ''
            } as Piece);
    }

    deletePiece(p: number) {
        this._pieces.splice(p, 1);
    }


    changeType() {
        if ( this._form.value.typeBien === 'Studio') {
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
            nomLogement: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(5)
            ])),
            typeLogement: new FormControl('', Validators.required),
            adPostal: new FormControl('', Validators.required),
            codePostal: new FormControl('', Validators.required),
            ville: new FormControl('', Validators.required),
            sh: new FormControl('', Validators.required),
            se: new FormControl('', Validators.required),
            nbPiece: new FormControl('', Validators.required),
            anneeCons: new FormControl('', Validators.required),
            typeBien: new FormControl('', Validators.required),
            nomPiece: new FormControl('', Validators.required),
            surface: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
        });
    }

}
