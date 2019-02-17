import {Component, EventEmitter, Inject, OnChanges, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../services/budget.service';
import {Task} from '../interfaces/task';
import {House, Room} from '../interfaces/house';
import {forEach} from '@angular/router/src/utils/collection';
import {FileUploader} from 'ng2-file-upload';
import {HttpHeaders} from '@angular/common/http';
import {AuthGuardService} from '../guards/auth-guard.service';
import {AuthenticationService} from '../services/authentication.service';
import {environment} from '../../environments/environment';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {flatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TasksService} from '../services/tasks.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
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
export class TaskDialogComponent implements OnInit, OnChanges {

    private readonly _backendURL: any;
    public uploader: FileUploader = new FileUploader({authToken: 'Bearer ' + this.authService.currentUserValue.token});
    data: string;
    uploadFile: boolean;
    private _step: string;
    blogTask = {
        name: '',
        room: '',
        description: '',
        budget: '',
        status: 'En Attente',
        start_date: new Date()
    };
    private _form: FormGroup;
    private _rooms: Room[];
    private _addMode: boolean;
    private _errorMsg: string;
    private _option: string;
    private _editMode: boolean;
    private _taskMode: Task;
    budgets = this.dataService.getBudgets();

    get rooms(): Room[] {
        return this._rooms;
    }

    get step(): string {
        return this._step;
    }

    get editMode(): boolean {
        return this._editMode;
    }

    get addMode(): boolean {
        return this._addMode;
    }

    get errorMsg(): string {
        return this._errorMsg;
    }

    get option(): string {
        return this._option;
    }
    constructor(
        public dataService: DataService,
        public _tasksService: TasksService,
        public authService: AuthenticationService,
        public _route: ActivatedRoute,
        public _router: Router,
        private _fb: FormBuilder
    ) {
        this._form = this._buildForm();
        this._option = 'non';
        this._step = 'tache';
        this._backendURL = {};

        // build backend base url
        let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
        if (environment.backend.port) {
            baseUrl += `:${environment.backend.port}`;
        }

        // build all backend urls
        Object.keys(environment.backend.endpoints.tasks).forEach(k => this._backendURL[ k ] =
            `${baseUrl}${environment.backend.endpoints.tasks[ k ]}`);
        if (this._editMode) {
            this.data = 'Modifier votre demande de travaux';
            this.uploadFile = true;
        } else {
            this.uploadFile = false;
            this._addMode = true;
            this.data = 'Ajouter une demande de travaux';
        }
        this.dataService.getAll().subscribe((_) => this._rooms = _);

    }

    private _buildForm(): FormGroup {
        return new FormGroup({
            nom: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            rooms: this._fb.array([]),
            desciption: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ])),
            budget: new FormControl('', Validators.compose([
                Validators.required, Validators.minLength(3)
            ]))
        });
    }

    toFile() {
        if (this.blogTask.name === '' || this.blogTask.budget === '' ||
            this.blogTask.room.length === 0 || this.blogTask.description === '') {
            this._errorMsg = 'Veuillez remplir tout les champs.';
        } else {
            this._taskMode.name = this.blogTask.name;
            this._taskMode.room = this.blogTask.room;
            this._taskMode.description = this.blogTask.description;
            this._taskMode.budget = this.blogTask.budget;
            this._taskMode.start_date = this.blogTask.start_date;
            this._taskMode.status = this.blogTask.status;
            this._tasksService.update(this._taskMode).subscribe(
            );
            this._step = 'file';
        }
    }

    setOptionO() {
        this._option = 'oui';
        this.blogTask.budget = '';
    }

    setOptionN() {
            this._option = 'non';
            this.blogTask.budget = '';
    }

    onSaveFile(name): void {
        console.log(name);
            this.uploader.setOptions({url: this._backendURL.upload.replace(':id', name), headers: this._options()});
            this.uploader.uploadAll();
        this._router.navigate(['/users/tasks']);
    }

    private _options(headerList: Object = {}): any {
        return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
    }

    ngOnChanges(task) {
        this._editMode = true;
        this.blogTask = task;
    }

    ngOnInit(): void {
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
}
