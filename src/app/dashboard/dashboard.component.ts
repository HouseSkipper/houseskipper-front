import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../services/task.service';
import {DataSource} from '@angular/cdk/table';
import {Task} from '../interfaces/task';
import {MatDialog} from '@angular/material';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {DataaService} from '../services/dataa.service';
import {FileUploader} from 'ng2-file-upload';
import {AuthenticationService} from '../services/authentication.service';
import {HttpHeaders} from '@angular/common/http';

const URL = 'http://localhost:8080/uploadFile/:id';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



    public uploader: FileUploader = new FileUploader({authToken: 'Bearer ' + this.authService.currentUserValue.token});
    displayedColumns = ['start_date', 'room', 'description', 'budget', 'status', 'file', 'PJ', 'delete'];
    dataSource = new TaskDataSource(this._dataService);
    private _files: string[];
    blogFile = { filename: ''};
    fileURL;
    constructor(private _dataService: DataaService, public dialog: MatDialog,
                public authService: AuthenticationService) {
    }

    get files(): string[] {
        return this._files;
    }
    ngOnInit() {

        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = true; };
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            console.log('ImageUpload:uploaded:', item, status, response);
            console.log('File uploaded successfully');
        };
    }

    deleteTask(id) {
        this._dataService.remove(id).subscribe(
            null,
            null,
            () => this.dataSource = new TaskDataSource(this._dataService)
        );
        this.dataSource = new TaskDataSource(this._dataService);
    }
    editTask(task): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '600px',
            data: task
        });
        dialogRef.componentInstance.event.subscribe((result) => {
            this._dataService.update(result.data).subscribe(
                null,
                null,
                () => this.dataSource = new TaskDataSource(this._dataService)
            );
        });
    }

    filesNames(id): void {
        this._dataService.getFiles(id).subscribe((_) => this._files = _, null, null);
    }

    downloadFile() {
        this._dataService.downloadFileNow(this.blogFile.filename).subscribe(
            response => this.downloadFileAs(response, 'image/png')
        );
        /*

        this._dataService.downloadFileNow(this.blogFile.filename).subscribe(
            _ => this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(_)),
            _ => console.log(_),
            null
        );
         */

    }

    openDialog(): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '600px',
            data: ''
        });
        dialogRef.componentInstance.event.subscribe((result) => {
            this._dataService.create(result.data).subscribe(
                null,
                null,
                () => this.dataSource = new TaskDataSource(this._dataService)
            );
            this.dataSource = new TaskDataSource(this._dataService);
        });
    }

    onSaveFile(id): void {
        console.log(id);
        this.uploader.setOptions({url: URL.replace(':id', id), headers: this._options()});
        this.uploader.uploadAll();
    }

    private _options(headerList: Object = {}): any {
        return { headers: new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList)) };
    }

    private downloadFileAs(data: any, type: string) {
        const blob = new Blob([data], {type: type});
        const url = window.URL.createObjectURL(blob);
        const pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
            alert('Disable Pop-up');
        }
    }
}



export class TaskDataSource extends DataSource<any> {
    constructor(private _dataService: DataaService) {
        super();
    }

    connect(): Observable<Task[]> {
        return this._dataService.getAll();
    }
    disconnect() {
    }
}
