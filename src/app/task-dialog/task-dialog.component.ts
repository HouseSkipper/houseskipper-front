import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../services/budget.service';
import {Task} from '../interfaces/task';
import {Room} from '../interfaces/house';
import {forEach} from '@angular/router/src/utils/collection';
import {FileUploader} from 'ng2-file-upload';
import {HttpHeaders} from '@angular/common/http';
import {AuthGuardService} from '../guards/auth-guard.service';
import {AuthenticationService} from '../services/authentication.service';
import {environment} from '../../environments/environment';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
        ])
    ]
})
export class TaskDialogComponent implements OnInit {

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
    private _rooms: Room[];
    private _addMode: boolean;
    private _errorMsg: string;
    private _option: string;
    budgets = this.dataService.getBudgets();
    public event: EventEmitter<any> = new EventEmitter();

    get rooms(): Room[] {
        return this._rooms;
    }

    get step(): string {
        return this._step;
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
        public dialogRef: MatDialogRef<TaskDialogComponent>,
        public dataService: DataService,
        @Inject(MAT_DIALOG_DATA) public blog: Task,
        public authService: AuthenticationService
    ) {
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
        if (!!blog) {
            this.blogTask = blog;
            this.data = 'Modifier votre demande de travaux';
            this.uploadFile = true;
        } else {
            this.uploadFile = false;
            this._addMode = true;
            this.data = 'Ajouter une demande de travaux';
        }
        this.dataService.getAll().subscribe((_) => this._rooms = _);

    }

    toFile() {
        if (this.blogTask.name === '' || this.blogTask.budget === '' || this.blogTask.room === '' || this.blogTask.description === '') {
            this._errorMsg = 'Veuillez remplir tout les champs.';
        } else {
            this.event.emit({data: this.blogTask});
            this._step = 'file';
        }
    }

    setOption() {
        if (this._option === 'non') {
            this._option = 'oui';
        } else {
            this._option = 'non';
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        // this.event.emit({data: this.blogTask});
        this.dialogRef.close();
    }
    onSaveFile(name): void {
        console.log(name);
        this.uploader.setOptions({url: this._backendURL.upload.replace(':id', name), headers: this._options()});
        this.uploader.uploadAll();
        this.onSubmit();
    }

    private _options(headerList: Object = {}): any {
        return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
    }


    ngOnInit(): void {
        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = true; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log('ImageUpload:uploaded:', item, status, response);
            console.log('File uploaded successfully');
        };
    }
}
