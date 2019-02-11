import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../services/budget.service';
import {DataSource} from '@angular/cdk/table';
import { Task} from '../interfaces/task';
import {MatDialog} from '@angular/material';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {TasksService} from '../services/tasks.service';
import {FileUploader} from 'ng2-file-upload';
import {AuthenticationService} from '../services/authentication.service';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {



    displayedColumns = ['start_date', 'name', 'room', 'description', 'budget', 'status', 'file', 'delete'];
    dataSource = new TaskDataSource(this._dataService);
    private _files: string[];
    blogFile = { filename: '', file: ''};
    hasFile: boolean;
    private _errorMsg = '';
    constructor(private _dataService: TasksService, public dialog: MatDialog
                ) {
        this.hasFile = false;
    }

    get files(): string[] {
        return this._files;
    }
    ngOnInit() {
    }

    get errorMsg(): string {
        return this._errorMsg;
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
        this._errorMsg = '';
        this._dataService.getFiles(id).subscribe((_) => {
            this._files = _;
            this.hasFile = true;
        }, () => this._files = [], () => {
            setTimeout(() => { console.log(''); }, 4000);
        });
    }

    downloadFile(file, id) {
        console.log(file + ', ' + id);
        this._dataService.downloadFileNow(file, id).subscribe(
            response => this.downloadFileAs(response, 'image/png'),
            () => this._errorMsg = 'Veuillez choisir une image à télécharger.'
        );

    }


    openDialog(): void {
        this._errorMsg = '';
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
        const a = document.createElement('a');
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
    constructor(private _dataService: TasksService) {
        super();
    }

    connect(): Observable<Task[]> {
        return this._dataService.getAll();
    }
    disconnect() {
    }
}
