import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {DataService} from '../services/task.service';
import {DataSource} from '@angular/cdk/table';
import {Task} from '../interfaces/Task';
import {MatDialog} from '@angular/material';
import {TaskDialogComponent} from '../task-dialog/task-dialog.component';
import {DataaService} from '../services/dataa.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    constructor(private _dataService: DataService, public dialog: MatDialog) { }

    displayedColumns = ['start_date', 'room', 'description', 'budget', 'status', 'delete'];
    dataSource = new TaskDataSource(this._dataService);

    ngOnInit() {
    }
    deleteTask(id) {
        // this._dataService.remove(id);
        this.dataSource = new TaskDataSource(this._dataService);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '600px',
            data: 'Add Task'
        });
        dialogRef.componentInstance.event.subscribe((result) => {
            this._dataService.addPost(result.data);
            this.dataSource = new TaskDataSource(this._dataService);
        });
    }
}



export class TaskDataSource extends DataSource<any> {
    constructor(private _dataService: DataService) {
        super();
    }

    connect(): Observable<Task[]> {
        return this._dataService.getData();
    }
    disconnect() {
    }
}
