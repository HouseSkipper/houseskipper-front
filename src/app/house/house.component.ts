import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

    private readonly _form: FormGroup;
    private _step: number;

    constructor() {
        this._form = this._buildForm();
        this._step = 0;
    }

    get step(): number {
        return this._step;
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
        });
    }

}
