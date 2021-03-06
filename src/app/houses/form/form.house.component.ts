import {Component, Input, OnChanges, OnInit, ViewChild, ɵunv} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {FileHouse, House} from '../../interfaces/house';
import {HouseService} from '../../services/house.service';
import {ActivatedRoute, Router} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {MatStepper} from '@angular/material';

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
    rooms: FormArray;
    private _pays: string[];
    private _classeEnergetique: string[];
    private _isUpdateMode: boolean;
    private _model: House;
    private _file: boolean;
    private _formFile: FormGroup;
    files: FormArray;

    @ViewChild('stepper') stepper: MatStepper;

    constructor(private _houseService: HouseService, private _router: Router, private _route: ActivatedRoute) {
        this._form = this._buildForm();
        this._step = -1;
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
        this.addItem('Salle de bain');
        this._pays = ['France', 'Luxembourg', 'Allemagne', 'Belgique', 'Suisse'];
        this._classeEnergetique = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        this._isUpdateMode = false;
        this._file = false;
        this._formFile = this._buildFormFile();
    }


    get file(): boolean {
        return this._file;
    }

    get formFile(): FormGroup {
        return this._formFile;
    }

    lengthRoom(): number {
        return this.rooms.length;
    }

    exterieur(): number {
        return parseInt(this.form.get('exterieur').value, 10);
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
            if (house.constructionYear === 0) {
                house.constructionYear = '0000';
            }
            for (let i = 0; i < house.rooms.length; i++) {
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
            for (let i = 0; i < taille; i++) {
                this.deletePiece(0);
            }
            taille = house.rooms.length;
            for (let i = 0; i < taille; i++) {
                this.rooms.push(this.createRoom(house.rooms[i].id, house.rooms[i].roomName, house.rooms[i].space, house.rooms[i].nbFenetre,
                    house.rooms[i].nbPorteFenetre, house.rooms[i].typeChauffage, house.rooms[i].nbRadiateur, house.rooms[i].volet,
                    house.rooms[i].nbVolet));
            }
            let fi: FileHouse[];
            this.files = this._formFile.get('files') as FormArray;
            this._houseService.fetchFiles(house.id).subscribe((_) => fi = _, null, () => {
                for (let i = 0; i < fi.length; i++) {
                    const f: File = new File([fi[i].pic], fi[i].fileName);
                    this.files.push(this.createFile(f, fi[i].description, fi[i].id));
                }
            });

        } else {
            this._isUpdateMode = false;
        }
    }

    createFile(name: File, description: string, id: string): FormGroup {
        return new FormGroup({
            description: new FormControl(description, Validators.required),
            file: new FormControl(name),
            id: new FormControl(id),
        });
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
        // this.stepper.selectedIndex = this.stepMatStepper();
        return this._step;
    }

    get types(): Type[] {
        return this._types;
    }

    deletePiece(p: number) {
        this.rooms = this._form.get('rooms') as FormArray;
        this.rooms.removeAt(p);
    }


    changeType() {
        let type = this._form.value.standardType;
        if (type !== 'Studio') {
            type = type.charAt(1);
        } else {
            type = 1;
        }
        this.rooms = this._form.get('rooms') as FormArray;
        const taille = this.rooms.length;
        for (let i = 2; i < taille; i++) {
            this.deletePiece(2);
        }
        for (let i = 0; i < type; i++) {
            this.addItem(undefined);
        }

    }

    setStep(index: number) {
        // console.log('set ' + index);
        this._step = index;
        this.stepper.selectedIndex = this.stepMatStepper();
    }

    nextStep() {
        this._step++;
        this.stepper.selectedIndex = this.stepMatStepper();
    }

    prevStep() {
        this._step--;
        this.stepper.selectedIndex = this.stepMatStepper();
    }

    ngOnInit() {
        this._route.params
            .pipe(
                map((params: any) => params.id),
                flatMap((id: string) => id === undefined ? of(undefined) : this._houseService.fetchHouse(id))
            )
            .subscribe((house: House) => house === undefined ? undefined : this.ngOnChanges(house));
        // .subscribe((house: House) => console.log(house));
        this.nextStep();
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
            constructionYear: new FormControl('0000', Validators.compose([
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
        this._houseService.create(payload).subscribe((_) => this._model = _, null, () => this.saveFile());
    }


    get isUpdateMode(): boolean {
        return this._isUpdateMode;
    }

    modifier(payload: House) {
        payload = this.verifier(payload);
        payload.id = this._model.id;
        this._file = true;
        this._houseService.modifier(payload).subscribe(null, null, () => this.saveFile());
    }

    private verifier(house: House): House {
        if (house.exterieur == 0) {
            house.outsideSpace = 0;
            house.surfaceExterieurArriere = 0;
            house.surfaceExterieurAvant = 0;
            house.surfaceExterieurDroit = 0;
            house.surfaceExterieurGauche = 0;
        }
        for (let i = 0; i < house.rooms.length; i++) {
            if (house.rooms[i].volet === 0) {
                house.rooms[i].nbVolet = 0;
            }
            if (house.rooms[i].typeChauffage === 'sol') {
                house.rooms[i].nbRadiateur = 0;
            }
        }
        return house;
    }

    public stepMatStepper(): number {
        // console.log('entre dans stepMats');
        if (this._step < 2) {
            return this._step;
        } else if (this._step === 2) {
            return 1;
        } else if (this._step === 3) {
            return 2;
        } else if (this._step >= 4 && this._step < 4 + this.lengthRoom()) {
            return 3;
        } else if (this.exterieur() === 1 && this.step === (4 + this.lengthRoom())) {
            return 4;
        } else if (this.exterieur() === 1 && this.step === (5 + this.lengthRoom())) {
            return 5;
        } else if (this.exterieur() === 1 && this.step > (5 + this.lengthRoom())) {
            return 6;
        } else if (this.exterieur() === 0 && this.step === (5 + this.lengthRoom())) {
            return 5;
        } else {
            return 4;
        }
    }

    checked(num: number): number {
        // console.log(this._form.get('surfaceToiture').value);
        switch (num) {
            case 1:
                if (this._form.get('houseType').invalid || this._form.get('residence').invalid
                    || this._form.get('houseName').invalid || this._form.get('standardType').invalid) {
                    return 0;
                } else if (this._form.get('constructionYear').value === '0000' || this._form.get('revetementExterieur').value === ''
                    || this._form.get('revetementToiture').value === '' || this._form.get('surfaceToiture').value === 0
                    || this._form.get('surfaceToiture').value === '') {
                    return 1;
                } else {
                    return 2;
                }
            case 2:
                if (this._form.get('pays').invalid || this._form.get('address').invalid
                    || this._form.get('postalCode').invalid || this._form.get('city').invalid) {
                    return 0;
                } else {
                    return 2;
                }
            case 3:
                if (this._form.get('classeEnergetique').invalid || this._form.get('gaz').invalid
                    || this._form.get('electricite').invalid || this._form.get('panneauxPhoto').invalid
                    || this._form.get('eolienne').invalid) {
                    return 0;
                } else if (this._form.get('classeEnergetique').value === '') {
                    return 1;
                } else if (this._form.get('gaz').value === '' && this._form.get('electricite').value === ''
                    && this._form.get('panneauxPhoto').value === '' && this._form.get('eolienne').value === '') {
                    return 1;
                } else if (this._form.get('gaz').value === '0' && this._form.get('electricite').value === '0'
                    && this._form.get('panneauxPhoto').value === '0' && this._form.get('eolienne').value === '0') {
                    return 1;
                } else {
                    return 2;
                }
            case 5:
                if (this._form.get('outsideSpace').invalid || this._form.get('surfaceExterieurAvant').invalid ||
                    this._form.get('surfaceExterieurDroit').invalid || this._form.get('surfaceExterieurGauche').invalid ||
                    this._form.get('surfaceExterieurArriere').invalid) {
                    return 0;
                } else if (this._form.get('outsideSpace').value === '0') {
                    return 1;
                } else if (parseInt(this._form.get('outsideSpace').value, 10) !==
                    (parseInt(this._form.get('surfaceExterieurAvant').value, 10)
                        + parseInt(this._form.get('surfaceExterieurDroit').value, 10)
                        + parseInt(this._form.get('surfaceExterieurGauche').value, 10)
                        + parseInt(this._form.get('surfaceExterieurArriere').value, 10))) {
                    return 1;
                } else {
                    return 2;
                }
            case 6:
                // console.log(this._form.get('comment').value);
                if (this._form.get('comment').invalid) {
                    return 0;
                } else if (this._form.get('comment').value === null || this._form.get('comment').value === '') {
                    return 1;
                } else {
                    return 2;
                }
            case 7:
                if (this._formFile.invalid) {
                    return 0;
                } else {
                    return 2;
                }
            default:
                return 0;
        }
    }

    checkRoom(i: number | undefined): number {
        const room = this._form.get('rooms')['controls'][i];
        // console.log(room.get('typeChauffage').value);
        if (room.invalid) {
            return 0;
        } else if (room.get('typeChauffage').value === 'radiateur' && parseInt(room.get('nbRadiateur').value, 10) === 0) {
            return 1;
        } else if (room.get('volet').value === '1' && parseInt(room.get('nbVolet').value, 10) === 0) {
            return 1;
        } else if (room.get('typeChauffage').value === '' || room.get('typeChauffage').value === null) {
            return 1;
        } else if (room.get('volet').value === '1'
            && parseInt(room.get('nbVolet').value, 10) >
            (parseInt(room.get('nbPorteFenetre').value, 10) + parseInt(room.get('nbFenetre').value, 10))) {
            return 1;
        } else {
            return 2;
        }
    }


    private _buildFormFile(): FormGroup {
        return new FormGroup({
            files: new FormArray([])
        });
    }

    addFile(): void {
        this.files = this._formFile.get('files') as FormArray;
        this.files.push(new FormGroup({
            description: new FormControl(''),
            file: new FormControl(''),
            id: new FormControl(),
        }));
    }

    onFileChange(event, i: number) {
        if (event.target.files.length > 0) {
            const file: File = event.target.files[0];
            this._formFile.get('files')['controls'][i].get('file').setValue(file);
            // console.log(this._formFile.get('files'));
            /*
            let input = new FormData();
            input.append('file', file);
            input.forEach((_) => console.log(_));
            // console.log(file);
            // console.log(input.);
            // this._houseService.uploadFile(input).subscribe();
            */
        }
    }

    saveFile() {
        // console.log(this._formFile.get('files'));
        // this.files = this._formFile.get('files') as FormArray;
        let vide = false;
        for (let i = 0; i < this._formFile.get('files').value.length; i++) {
            if (this._formFile.get('files')['controls'][i].get('id').value === null) {
                vide = true;
                const input = new FormData();
                input.append('file', this._formFile.get('files')['controls'][i].get('file').value);
                input.append('description', this._formFile.get('files')['controls'][i].get('description').value);
                if (i === this._formFile.get('files').value.length - 1) {
                    this._houseService.uploadFile(input, this._model.id).subscribe(null, null, () => this._router.navigate(['/users/houses']));
                } else {
                    this._houseService.uploadFile(input, this._model.id).subscribe();
                }
            }
            // console.log(this._formFile.get('files')['controls'][i]);

        }
        if (vide === false) {
            this._router.navigate(['/users/houses']);
        }

    }

    downloadFileAs(id: string, data: any) {
        this._houseService.fetchFile(id).subscribe((_) => {
            const a = document.createElement('a');
            document.body.appendChild(a);
            let type = '';
            if (data.name.includes('png') || data.name.includes('jpg')
                || data.name.includes('jpeg')) {
                type = 'image/jpg';
            } else if (data.name.includes('pdf')) {
                type = 'application/pdf';
            }
            const blob = new Blob([_], {type: type});
            const url = window.URL.createObjectURL(blob);
            const pwa = window.open(url);
            if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
                alert('Disable Pop-up');
            } else {
                a.href = url;
                a.download = data.name;
                a.click();
            }
        });
    }

    removeFile(id: string, i: number) {
        this._houseService.removeFile(id).subscribe(null, null, () => {
            this.files = this._formFile.get('files') as FormArray;
            this.files.removeAt(i);
            this._formFile.get('files').setValue(this.files);
        });
    }


}
