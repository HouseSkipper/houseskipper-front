import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {FileUploader} from 'ng2-file-upload';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {House, Room} from '../interfaces/house';
import {environment} from '../../environments/environment';
import {DataService} from '../services/budget.service';
import {flatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Task} from '../interfaces/task';
import {TasksService} from '../services/tasks.service';
import {HttpHeaders} from '@angular/common/http';
import {HouseService} from '../services/house.service';
import {MatStepper} from '@angular/material';
import {forEach} from '@angular/router/src/utils/collection';

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
    private _file: boolean;
    private _errorMsg: string;
    private _taskid: string;
    public blogTask = {
        taskName: '',
        residence: '',
        partie: '',
        partieExacte: '',
        type: '',
        connaissance: '',
        resultat: '',
        comment: ''
    };

    @ViewChild('stepper') stepper: MatStepper;
    constructor(
                public dataService: DataService,
                public authService: AuthenticationService,
                public _route: ActivatedRoute,
                public _router: Router,
                public _tasksService: TasksService,
                private _fb: FormBuilder,
                private _houseService: HouseService
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
        this.dataService.getAll().subscribe((_) => this._rooms = _);
        this._houseService.fecthAllHouse().subscribe((_) => this._data = _);
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
            partieExacte: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
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
            status: new FormControl()
        });
    }

    ngOnChanges(task) {
        console.log(task);
        this._editMode = true;
        this._addMode = false;
        this._taskid = task.id;
        this._form.patchValue(task);
        this.blogTask.partieExacte = task.partieExacte;
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

    get roomsC(): Room[] {
        let roomsC: Room[];
        for (const t of this._rooms) {
            if (t.roomName.includes(this.blogTask.residence)) {
               roomsC.push(t);
            }
        }
        return roomsC;
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
        this.stepper.selectedIndex = this._step;
    }

    nextStep() {
          this._step++;
        this.stepper.selectedIndex = this._step;
    }

    prevStep() {
        this._step--;
        this.stepper.selectedIndex = this._step;
    }

    submit(task: Task) {
      if (task.nom === '' || task.partie === '' || task.partieExacte === '' || task.resultat === '' || task.type === '' ||
          task.description === '' || task.connaissance === '' ) {
        this._errorMsg = 'Tous les champs sont obligatoires.';
      } else {
        task.start_date = new Date();
        task.status = 'En attente';
        this._tasksService.create(task).subscribe((_) => console.log(task), null, () => {

            this._file = true;
        });
          this.stepper.selectedIndex = this._step + 1;
      }
    }

    addFiled(){}

    edit(task: Task) {
        console.log(this._taskid);
        task.id = this._taskid;
         this._tasksService.update(task).subscribe((_) => console.log(task), null, () => {
             this._file = true;
         });
        this.stepper.selectedIndex = this._step + 1;
    }

    onSaveFile(): void {
        console.log(this.blogTask.taskName);
        this.uploader.setOptions({url: this._backendURL.upload.replace(':id', this.blogTask.taskName), headers: this._options()});
        this.uploader.uploadAll();
        this._router.navigate(['/users/tasks']);
    }

    private _options(headerList: Object = {}): any {
        return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
    }
}
