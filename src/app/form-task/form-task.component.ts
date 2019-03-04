import {Component, ElementRef, OnChanges, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FileUploader} from 'ng2-file-upload';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {House, Room} from '../interfaces/house';
import {environment} from '../../environments/environment';
import {DataService} from '../services/budget.service';
import {flatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Commentaire, PartieExacte, Phase, Task} from '../interfaces/task';
import {TasksService} from '../services/tasks.service';
import {HttpHeaders} from '@angular/common/http';
import {HouseService} from '../services/house.service';
import {MatStepper} from '@angular/material';
import {forEach} from '@angular/router/src/utils/collection';
import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.css'],
    animations: [
        trigger('slideInOut', [
            state('in', style({opacity: 1})),
            transition(':leave', [
                animate('200ms ease-in', style({transform: 'translateX(+100%)', opacity: 0}))
            ]),
            transition(':enter', [
                style({transform: 'translateX(100%)', opacity: 0}),
                animate('600ms ease-in', style({transform: 'translateX(0%)'}))
            ])
        ]),
        trigger('slideUpDown', [
            state('up', style({opacity: 1})),
            transition(':leave', [
                animate('200ms ease-in', style({transform: 'translateY(+100%)', opacity: 0}))
            ]),
            transition(':enter', [
                style({transform: 'translateY(100%)', opacity: 0}),
                animate('600ms ease-in', style({transform: 'translateY(0%)'}))
            ])
        ])
    ]
})
export class FormTaskComponent implements OnInit, OnChanges {

    private readonly _backendURL: any;
    public uploader: FileUploader = new FileUploader({authToken: 'Bearer ' + this.authService.currentUserValue.token});
    uploadFile: boolean;
    private _step: number;
    private _form: FormGroup;
    private _rooms: Room[];
    private _data: House[];
    private _addMode: boolean;
    private _editMode: boolean;
    private _principal: boolean;
    private _file: boolean;
    private _errorMsg: string;
    private _taskid: string;
    public blogTask = {
        taskName: '',
        residence: '',
        partie: '',
        partieExacte: [],
        type: '',
        connaissance: '',
        resultat: '',
        comment: ''
    };
    private _files: string[];
    public now = new Date();
    @ViewChild('fileInput')
    fileInput: ElementRef;

    private _currentTask: Task;

    @ViewChild('stepper') stepper: MatStepper;
    constructor(
                public dataService: DataService,
                public authService: AuthenticationService,
                public _route: ActivatedRoute,
                public _router: Router,
                public _tasksService: TasksService,
                private _houseService: HouseService,
                private _datePipe: DatePipe
    ) {
      this._form = this._buildForm();
        this._step = 0;
        this._file = false;
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        // build all backend urls
        Object.keys(environment.backend.endpoints.tasks).forEach(k => this._backendURL[ k ] =
            `${baseUrl}${environment.backend.endpoints.tasks[ k ]}`);
            this._houseService.fecthAllHouse().subscribe((_) => this._data = _);
            this._principal = true;
    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            nom: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            residence: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            partie: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            partiesExacte: new FormArray([this.getPiece('')]),
            typeSecondaires: new FormArray([this.getTypeSec('')]),
            commentaires: new FormArray([this.getCommentaire(this.now, '', '', '')]),
            type: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            connaissance: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            resultat: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            description: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3), Validators.maxLength(255)
            ])),
            status: new FormControl(),
            filename: new FormControl(),
        });
    }

    get principal(): boolean {
        return this._principal;
    }

    get currentTask(): Task {
        return this._currentTask;
    }

    setMode(signe: string) {
        switch (signe) {
            case 'p':
                this._principal = true;
                this.checked(1);
                break;
            case 's':
                this._principal = false;
                this.checked(1);
                this._form.get('type').setValue('');
                break;
        }
    }

    private getTypeSec(nom: string): FormGroup {
        return new FormGroup({
            typeS:  new FormControl(nom, Validators.compose([
                Validators.required, Validators.minLength(3)
            ]))
        });
    }

    private getCommentaire(date: Date, auteur: string, etat: string, commentaire: string): FormGroup {
        return new FormGroup({
            datec:  new FormControl(this._datePipe.transform(date, 'yyyy-MM-dd'), Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            auteur:  new FormControl(auteur, Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            etat:  new FormControl(etat, Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            commentaire:  new FormControl(commentaire, Validators.compose([
                Validators.required, Validators.minLength(3)
            ]))
        });
    }

    private addCommentaire(date: Date, auteur: string, etat: string, commentaire: string) {
        console.log(this._datePipe.transform(date, 'yyyy-MM-dd'));
        if (this._datePipe.transform(date, 'yyyy-MM-dd') === null) {
            date = this.now;
        }
        const control = <FormArray>this._form.get('commentaires');
        control.push(this.getCommentaire(date, auteur, etat, commentaire));
    }

    private addTypeSec(nom: string) {
        const control = <FormArray>this._form.get('typeSecondaires');
        control.push(this.getTypeSec(nom));
    }

    private getPiece(nom: string): FormGroup {
        return new FormGroup({
           local:  new FormControl(nom, Validators.compose([
               Validators.required, Validators.minLength(3)
           ]))
        });
    }

    private addPiece(nom: string) {
        const control = <FormArray>this._form.get('partiesExacte');
        control.push(this.getPiece(nom));
    }

    get files(): string[] {
        return this._files;
    }

    addComment(auteur, etat, com) {
        console.log(auteur +  etat + com);
        let commentaire: Commentaire;
        commentaire = {datec: this.now, auteur: auteur, etat: etat, commentaire: com, phasec: this._currentTask.currentPhase};
         this._tasksService.sendComment(this.blogTask.taskName, commentaire)
             .subscribe(null, null, null);
        this.addCommentaire(this.now, '', '', '');
    }

    onSelectFile(event) {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            this._form.get('filename').setValue(file.name);
        }
    }

    selectFile(): void {
        this.fileInput.nativeElement.click();
    }

    ngOnChanges(task) {
        console.log(task);
        const taille = task.partiesExacte.length;
        const pieces = task.partiesExacte;
        const comments = task.commentaires;
        const tailleC = task.commentaires.length;
        this._editMode = true;
        this._addMode = false;
        this._taskid = task.id;
        this.blogTask.type = task.type;
        for (let i = 0; i < taille; i++) {
            this.removeP(i);
        }
        for (let i = 0; i < taille; i++) {
            console.log(i);
            this.addPiece(pieces[i].local);
        }
        for (let i = 0; i < tailleC; i++) {
            this.removeC(i);
        }
        for (let i = 0; i < tailleC; i++) {
            console.log(i);
            this.addCommentaire(comments[i].datec, comments[i].auteur, comments[i].etat, comments[i].commentaire);
        }
        if (task.typeSecondaires !== undefined) {
            const tailleT = task.typeSecondaires.length;
            console.log(tailleT);
            if (tailleT !== 0) {
                const typeSec = task.typeSecondaires;
                for (let i = 0; i < tailleT; i++) {
                    this.removeT(i);
                }
                for (let i = 0; i < tailleT; i++) {
                    console.log(i);
                    this.addTypeSec(typeSec[i].typeS);
                }
                this.setMode('s');
            } else {
                this.blogTask.type = task.type;
            }
        }
        this._form.patchValue(task);
        this.roomsC();
        this.filesNames(task.id);
        this._currentTask = task;
    }

    removeP(num: number) {
        const control = <FormArray>this._form.controls['partiesExacte'];
        control.removeAt(num);
    }

    removeC(num: number) {
        const control = <FormArray>this._form.controls['commentaires'];
        control.removeAt(num);
    }

    removeT(num: number) {
        const control = <FormArray>this._form.controls['typeSecondaires'];
        control.removeAt(num);
    }

  ngOnInit() {
        this._addMode = true;
        this._editMode = false;
      this._route.params
          .pipe(
              map((params: any) => params.id),
              flatMap((id: string) => id === undefined ? of(undefined) : this._tasksService.get(id))
          )
          .subscribe((task: Task) => task === undefined ? undefined : this.ngOnChanges(task));

      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = true; };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          console.log('ImageUpload:uploaded:', item, status, response);
          console.log('File uploaded successfully');
      };
  }

  roomsC() {
        this.dataService.getRoomsByHouse(this.blogTask.residence).subscribe((_) => this._rooms = _);
    }

    get rooms(): Room[] {
        return this._rooms;
    }

    get houses(): House[] {
      return this._data;
    }

    get step(): number {
        return this._step;
    }

    get addMode(): boolean {
        return this._addMode;
    }

    get errorMsg(): string {
        return this._errorMsg;
    }

    get form(): FormGroup {
      return this._form;
    }

    get file(): boolean {
      return this._file;
    }

    get editMode(): boolean {
        return this._editMode;
    }

    setStep(index: number) {
        console.log('set ' + index);
        this._step = index;
        // this.stepper.selectedIndex = this._step;
    }

    nextStep() {
          this._step++;
          if ( this.checked(this._step - 1) === 0) {
              this._errorMsg = 'Tous les champs sont obligatoires.';
              this._step --;
          }

        // this.stepper.selectedIndex = this._step;
    }

    prevStep() {
        this._step--;
        // this.stepper.selectedIndex = this._step;
    }

    submit(task: Task) {
        console.log(task);
      if (task.nom === '' || task.partie === '' || this._form.get('partiesExacte')['controls'][0] === ''
          || task.resultat === '' ||
          task.description === '' || task.connaissance === '' ) {
          if ( this._form.get('typeSecondaires')['controls'][0].invalid || task.type === '') {
            this._errorMsg = 'Tous les champs sont obligatoires.';
          }
      } else {
        task.start_date = new Date();
        task.status = {phaseName: 'Redaction'};
        this._tasksService.create(task).subscribe((_) => console.log(task), (_) => console.log(_), () => {
            this._file = true;
            this._step++;
        });
          this._currentTask = task;
          // this.stepper.selectedIndex = this._step + 1;
      }
    }

    checked(num: number): number {
        switch (num) {
            case 1:
                let res: number;
                if (this._form.get('nom').status === 'VALID' || this._form.get('residence').status === 'VALID'
                    || this._form.get('partie').status === 'VALID') {
                    for (let i = 0; i < this._form.get('partiesExacte')['controls'].length; i++) {
                        if (this._form.get('partiesExacte')['controls'][i].invalid) {
                           return res = -1;
                        } else {
                            res = 1;
                        }
                    }
                    if (this._principal === true) {
                        if (this._form.get('type').status === 'VALID') {
                            res = 2;
                        } else {
                            return res = -2;
                        }
                        return res;
                    } else {
                        for (let i = 0; i < this._form.get('typeSecondaires')['controls'].length; i++) {
                            if (this._form.get('typeSecondaires')['controls'][i].invalid) {
                                return res = -1;
                            } else {
                                res = 2;
                            }
                        }
                        return res;
                    }
                    return res;
                }
                break;
            case 2:
                if (this._form.get('connaissance').invalid || this._form.get('resultat').invalid
                    || this._form.get('description').invalid ) {
                    return 0;
                } else {
                    return 1;
                }
                break;
            case 3:
                for (let i = 0; i < this._form.get('commentaires')['controls'].length; i++) {
                    if (this._form.get('commentaires')['controls'][i].invalid) {
                        return res = -1;
                    } else {
                        res = 2;
                    }
                }
                return res;
                break;
            case 4:
                if (this._form.get('filename').invalid) {
                    return 0;
                } else {
                    return 1;
                }
                break;
        }
    }

    edit(task: Task) {
        console.log(this._taskid);
        task.id = this._taskid;
        task.status.phaseName = this._currentTask.status.phaseName;
        if (this._principal) {
            const tailleT = task.typeSecondaires.length;
            console.log(tailleT);
            if (tailleT !== 0) {
                const typeSec = task.typeSecondaires;
                for (let i = 0; i < tailleT; i++) {
                    this.removeT(i);
                }
            }
        } else {
            task.type = '';
        }
         this._tasksService.update(task).subscribe((_) => console.log(_), null, () => {
             this.onSaveFile();
             this._file = true;
         });
         this.onSaveFile();
        // this.stepper.selectedIndex = this._step + 1;
    }

    filesNames(id): void {
        this._tasksService.getFiles(id).subscribe((_) => {
            this._files = _;
        }, () => this._files = [], null);
    }

    onSaveFile(): void {
        console.log(this.blogTask.taskName);
        this.uploader.setOptions({url: this._backendURL.upload.replace(':id', this.blogTask.taskName), headers: this._options()});
        this.uploader.uploadAll();
        this.nextStep();
    }

    toTaskList() {
        console.log(this._form.get('commentaires')['controls'][this._form.get('commentaires')['controls'].length - 1].commentaire + 'eee');
        this._router.navigate(['/users/tasks']);
    }

    private _options(headerList: Object = {}): any {
        return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
    }
}
