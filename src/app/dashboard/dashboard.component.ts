import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../services/task.service';
import {DataSource} from '@angular/cdk/table';
import {Task} from '../interfaces/task';
import {MatDialog} from '@angular/material';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {DataaService} from '../services/dataa.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private _dataService: DataaService, public dialog: MatDialog) { }

    displayedColumns = ['start_date', 'room', 'description', 'budget', 'status', 'delete', 'edit'];
    dataSource = new TaskDataSource(this._dataService);

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
