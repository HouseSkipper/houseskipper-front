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

@Component({
  selector: 'app-dashboard',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {



    displayedColumns = ['start_date', 'name', 'room', 'description', 'budget', 'status', 'file', 'delete'];
    dataSource = new TaskDataSource(this._dataService);
    private _files: string[];
    blogFile = { filename: ''};
    fileURL;
    constructor(private _dataService: DataaService, public dialog: MatDialog,
                ) {
    }

    get files(): string[] {
        return this._files;
    }
    ngOnInit() {
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


    private downloadFileAs(data: any, type: string) {
        let a = document.createElement('a');
        document.body.appendChild(a);
        const blob = new Blob([data], {type: type});
        const url = window.URL.createObjectURL(blob);
        const pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed === 'undefined') {
            alert('Disable Pop-up');
        } else {
            a.href = url;
            a.download = 'image.png';
            a.click();
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
