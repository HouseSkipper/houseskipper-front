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
    private  _pays: string[];
    private  _classeEnergetique: string[];

    constructor(private _houseService: HouseService, private _router: Router) {
        this._form = this._buildForm();
        this._step = 0;
        this._types = [
            {value: 'Studio'},
            {value: 'T1'},
            {value: 'T2'},
            {value: 'T3'},
            {value: 'T4'},
            {value: 'T5'},
            {value: 'T6'},
            {value: 'T7'},
        ];
        this._studio = false;
        this.addItem('Salle de bain');
        this._pays = ['France', 'Luxembourg', 'Allemagne', 'Belgique', 'Suisse'];
        this._classeEnergetique = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

    }

    get classEnergetique(): string[] {
        return this._classeEnergetique;
    }
    get pays(): string[] {
        return this._pays;
    }

    createItem(p: number, nom: string | undefined): FormGroup {
        return new FormGroup({
            id: new FormControl(p),
            roomName: new FormControl(nom),
            space: new FormControl(''),
            nbFenetre: new FormControl(''),
            nbPorteFenetre: new FormControl(''),
            typeChauffage: new FormControl('radiateur'),
            nbRadiateur: new FormControl('0'),
            volet: new FormControl('non'),
            nbVolet: new FormControl('1')
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
        let type = this._form.value.standardType;
        if (type !== 'Studio') {
            type = type.charAt(1);
            console.log(type);
        }
        this.rooms = this._form.get('rooms') as FormArray;
        const taille = this.rooms.length;
        for (let i = 2; i < taille ; i++) {
            this.deletePiece(2);
        }
        for (let i = 0; i < type ; i++) {
            this.addItem(undefined);
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
            residence: new FormControl('', Validators.required),
            exterieur: new FormControl('non', Validators.required),
            address: new FormControl('', Validators.required),
            postalCode: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            pays: new FormControl('', Validators.required),
            outsideSpace: new FormControl('', Validators.required),
            constructionYear: new FormControl('', Validators.required),
            standardType: new FormControl('', Validators.required),
            // rooms: new FormArray([this.createItem(0)]),
            // rooms: new FormArray([this.createItem(0, 'Cuisine' )]),
            rooms: new FormArray([this.createItem(0, 'Cuisine')]),
            revetementExterieur: new FormControl('', Validators.required),
            surfaceToiture: new FormControl('', Validators.required),
            revetementToiture: new FormControl('', Validators.required),
            classeEnergetique: new FormControl('', Validators.required),
            gaz: new FormControl('', Validators.required),
            electricite: new FormControl('', Validators.required),
            panneauxPhoto: new FormControl('', Validators.required),
            eolienne: new FormControl('', Validators.required),
            surfaceExterieurAvant: new FormControl('', Validators.required),
            surfaceExterieurDroit: new FormControl('', Validators.required),
            surfaceExterieurGauche: new FormControl('', Validators.required),
            surfaceExterieurArriere: new FormControl('', Validators.required),
            comment: new FormControl(''),
        });
    }

    addItem(nom: string | undefined): void {
        this.rooms = this._form.get('rooms') as FormArray;
        this.rooms.push(this.createItem(this.rooms.length, nom));
    }


    submit(payload: House) {
        this._houseService.create(payload).subscribe( (_) => this._router.navigate([ '/users/houses']));
    }

}
