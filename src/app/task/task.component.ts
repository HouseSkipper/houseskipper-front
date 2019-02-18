import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../services/budget.service';
import {DataSource} from '@angular/cdk/table';
import { Task} from '../interfaces/task';
import {MatDialog, MatPaginator, MatTableDataSource} from '@angular/material';
import {TasksService} from '../services/tasks.service';
import {FileUploader} from 'ng2-file-upload';
import {AuthenticationService} from '../services/authentication.service';
import {HttpHeaders} from '@angular/common/http';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {



    displayedColumns = ['start_date', 'name', 'room', 'description', 'budget', 'status', 'file', 'delete'];
    taskList: Task[];
    dataSource: MatTableDataSource<Task>;
    private _files: string[];
    blogFile = { filename: '', file: ''};
    hasFile: boolean;
    private _errorMsg = '';

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private _dataService: TasksService, private _router: Router
                ) {
        this.hasFile = false;
        new TaskDataSource(this._dataService).connect().subscribe(_ => {
            this.dataSource = new MatTableDataSource<Task>(_);
            this.dataSource.paginator = this.paginator;
            }
        );
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
            () => {
                new TaskDataSource(this._dataService).connect().subscribe(_ => {
                        this.dataSource = new MatTableDataSource<Task>(_);
                        this.dataSource.paginator = this.paginator;
                    }
                );
            }
        );
    }


    editTask(task) {
        this._router.navigate(['/users/tasks/' + task.id]);
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
            response => {
                if (this.blogFile.file.includes('png') || this.blogFile.file.includes('jpg')
                    || this.blogFile.file.includes('jpeg')) {
                this.downloadFileAs(response, 'image/jpg');
                } else if (this.blogFile.file.includes('pdf')) {
                    this.downloadFileAs(response, 'application/pdf');
                }
            },
            () => this._errorMsg = 'Veuillez choisir une image à télécharger.'
        );

    }


    addTask() {
        this._router.navigate(['/users/tasks/addtask']);
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
            a.download = this.blogFile.file;
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
