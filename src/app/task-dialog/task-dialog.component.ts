import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../services/task.service';
import {Task} from '../interfaces/task';
import {Room} from '../interfaces/house';
import {forEach} from '@angular/router/src/utils/collection';
import {FileUploader} from 'ng2-file-upload';
import {HttpHeaders} from '@angular/common/http';
import {AuthGuardService} from '../guards/auth-guard.service';
import {AuthenticationService} from '../services/authentication.service';

const URL = 'http://localhost:8080/uploadFile/:id/1';
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

    public uploader: FileUploader = new FileUploader({authToken: 'Bearer ' + this.authService.currentUserValue.token});
    data: string;
    blogTask = {
        name: '',
        room: '',
        description: '',
        budget: '',
        status: 'En Attente',
        start_date: new Date()
    };
    private _rooms: Room[];
    budgets = this.dataService.getBudgets();
    public event: EventEmitter<any> = new EventEmitter();

    get rooms(): Room[] {
        return this._rooms;
    }
    constructor(
        public dialogRef: MatDialogRef<TaskDialogComponent>,
        public dataService: DataService,
        @Inject(MAT_DIALOG_DATA) public blog: Task,
        public authService: AuthenticationService
    ) {
        if (!!blog) {
            this.blogTask = blog;
            this.data = 'Edit Task';
        } else {
            this.data = 'Add Task';
        }
        this.dataService.getAll().subscribe((_) => this._rooms = _);

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onSubmit(): void {
        this.event.emit({data: this.blogTask});
        this.dialogRef.close();
    }

    onSaveFile(name): void {
        console.log(name );
        this.uploader.setOptions({url: URL.replace(':id', name), headers: this._options()});
        this.uploader.uploadAll();
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
