import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../services/task.service';
import {Task} from '../interfaces/task';
import {Room} from '../interfaces/house';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

    data: string;
    blogTask = {
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
        @Inject(MAT_DIALOG_DATA) public blog: Task
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



    ngOnInit(): void {
    }
}
