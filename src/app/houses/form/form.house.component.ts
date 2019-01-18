import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {House} from '../../interfaces/house';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';

export interface Type {
    value: string;
}


@Component({
    selector: 'app-form-house',
    templateUrl: './form.house.component.html',
    styleUrls: ['./form.house.component.css']
})
export class FormHouseComponent implements OnInit, OnChanges {

    private readonly _form: FormGroup;
    private _step: number;
    private _types: Type[];
    private _studio: boolean;
    rooms: FormArray;
    private  _pays: string[];
    private  _classeEnergetique: string[];
    private _isUpdateMode: boolean;
    private _model: House;

    constructor(private _houseService: HouseService, private _router: Router, private _route: ActivatedRoute) {
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
        this._isUpdateMode = false;

    }

    ngOnChanges(house) {
        if (house.houseName !== undefined) {
            if (house.exterieur === 0) {
                house.exterieur = '0';
            } else {
                house.exterieur = '1';
            }
            if (house.gaz === 0) {
                house.gaz = '0';
            } else {
                house.gaz = '1';
            }
            if (house.electricite === 0) {
                house.electricite = '0';
            } else {
                house.electricite = '1';
            }
            if (house.panneauxPhoto === 0) {
                house.panneauxPhoto = '0';
            } else {
                house.panneauxPhoto = '1';
            }
            if (house.eolienne === 0) {
                house.eolienne = '0';
            } else {
                house.eolienne = '1';
            }
            for (let i = 0; i < house.rooms.length ; i++) {
                if (house.rooms[i].volet === 0) {
                    house.rooms[i].volet = '0';
                } else {
                    house.rooms[i].volet = '1';
                }
            }
            this._model = house;
            this._isUpdateMode = true;
            this._form.get('rooms').reset();
            this._form.patchValue(this._model);
            this.rooms = this._form.get('rooms') as FormArray;
            let taille = this.rooms.length;
            for (let i = 0; i < taille ; i++) {
                this.deletePiece(0);
            }
            taille = house.rooms.length;
            for (let i = 0; i < taille ; i++) {
                this.rooms.push(this.createRoom(house.rooms[i].id, house.rooms[i].roomName, house.rooms[i].space, house.rooms[i].nbFenetre,
                    house.rooms[i].nbPorteFenetre, house.rooms[i].typeChauffage, house.rooms[i].nbRadiateur, house.rooms[i].volet,
                    house.rooms[i].nbVolet));
            }

        } else {
            this._isUpdateMode = false;
        }
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
            space: new FormControl('', Validators.compose([
                    Validators.required, Validators.pattern('\\d*')
                ])),
            nbFenetre: new FormControl('0', Validators.compose([
                Validators.pattern('\\d*')
            ])),
            nbPorteFenetre: new FormControl('0', Validators.compose([
                Validators.pattern('\\d*')
            ])),
            typeChauffage: new FormControl('radiateur'),
            nbRadiateur: new FormControl('0', Validators.compose([
                Validators.pattern('\\d*')
            ])),
            volet: new FormControl('0'),
            nbVolet: new FormControl('0', Validators.compose([
                Validators.pattern('\\d*')
            ]))
        });
    }

    createRoom(id: number, nom: string, space: number, nbFenetre: string, nbPorteFenetre: string, typeChauffage: string,
               nbRadiateur: string, volet: string, nbVolet: string): FormGroup {
        return new FormGroup({
            id: new FormControl(id),
            roomName: new FormControl(nom),
            space: new FormControl(space, Validators.compose([
                Validators.required, Validators.pattern('\\d*')
            ])),
            nbFenetre: new FormControl(nbFenetre, Validators.compose([
                Validators.pattern('\\d*')
            ])),
            nbPorteFenetre: new FormControl(nbPorteFenetre, Validators.compose([
                Validators.pattern('\\d*')
            ])),
            typeChauffage: new FormControl(typeChauffage),
            nbRadiateur: new FormControl(nbRadiateur, Validators.compose([
               Validators.pattern('\\d*')
            ])),
            volet: new FormControl(volet),
            nbVolet: new FormControl(nbVolet, Validators.compose([
                Validators.pattern('\\d*')
            ]))
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
        } else {
            type = 1;
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
        if (this._form.get('exterieur').value === '0' && this._step === 4) {
            this._step = this._step + 2;
        } else {
            this._step++;
        }
    }

    prevStep() {
        this._step--;
    }

    ngOnInit() {
        this._route.params
            .pipe(
                map((params: any) => params.id),
                flatMap((id: string) => this._houseService.fetchHouse(id))
            )
            .subscribe((house: House) => house === undefined ? undefined : this.ngOnChanges(house));
            // .subscribe((house: House) => console.log(house));
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
            exterieur: new FormControl('0'),
            address: new FormControl('', Validators.required),
            postalCode: new FormControl('', Validators.compose([
                Validators.required, Validators.pattern('\\d{5}')
            ])),
            city: new FormControl('', Validators.required),
            pays: new FormControl('', Validators.required),
            outsideSpace: new FormControl('0', Validators.compose([
                Validators.pattern('\\d*')
            ])),
            constructionYear: new FormControl('', Validators.compose([
                Validators.pattern('\\d{4}')
            ])),
            standardType: new FormControl('', Validators.required),
            // rooms: new FormArray([this.createItem(0)]),
            // rooms: new FormArray([this.createItem(0, 'Cuisine' )]),
            rooms: new FormArray([this.createItem(0, 'Cuisine')]),
            revetementExterieur: new FormControl(''),
            surfaceToiture: new FormControl('', Validators.compose([
                    Validators.pattern('\\d*')
                ])),
            revetementToiture: new FormControl(''),
            classeEnergetique: new FormControl(''),
            gaz: new FormControl(''),
            electricite: new FormControl(''),
            panneauxPhoto: new FormControl(''),
            eolienne: new FormControl(''),
            surfaceExterieurAvant: new FormControl('0', Validators.compose([
                Validators.pattern('\\d*')
            ])),
            surfaceExterieurDroit: new FormControl('0', Validators.compose([
               Validators.pattern('\\d*')
            ])),
            surfaceExterieurGauche: new FormControl('0', Validators.compose([
                Validators.pattern('\\d*')
            ])),
            surfaceExterieurArriere: new FormControl('0', Validators.compose([
                Validators.pattern('\\d*')
            ])),
            comment: new FormControl(''),
        });
    }

    addItem(nom: string | undefined): void {
        this.rooms = this._form.get('rooms') as FormArray;
        this.rooms.push(this.createItem(this.rooms.length, nom));
    }


    submit(payload: House) {
        payload = this.verifier(payload);
        this._houseService.create(payload).subscribe( (_) => this._router.navigate([ '/users/houses']));
    }


    get isUpdateMode(): boolean {
        return this._isUpdateMode;
    }

    modifier(payload: House) {
        payload = this.verifier(payload);
        payload.id = this._model.id;
        this._houseService.modifier(payload).subscribe( (_) => this._router.navigate([ '/users/houses']));
    }

    private verifier(house: House): House {
        if (house.exterieur == 0) {
            house.outsideSpace = 0;
            house.surfaceExterieurArriere = 0;
            house.surfaceExterieurAvant = 0;
            house.surfaceExterieurDroit = 0;
            house.surfaceExterieurGauche = 0;
        }
        for (let i = 0; i < house.rooms.length ; i++) {
            if (house.rooms[i].volet === 0) {
                house.rooms[i].nbVolet = 0;
            }
            if (house.rooms[i].typeChauffage === 'sol') {
                house.rooms[i].nbRadiateur = 0;
            }
        }
        return house;
    }
}
