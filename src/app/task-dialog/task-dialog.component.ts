import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../services/task.service';
import {Task} from '../interfaces/task';

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

    budgets = this.dataService.getBudgets();
    rooms = this.dataService.getAll();
    public event: EventEmitter<any> = new EventEmitter();

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
