import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DataService} from '../services/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

    blogTask = {
        room: '',
        description: '',
        budget: '',
        status: 'En Attente',
        start_date: new Date()
    };

    budgets = this.dataService.getBudgets();
    public event: EventEmitter<any> = new EventEmitter();

    constructor(
        public dialogRef: MatDialogRef<TaskDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dataService: DataService
    ) {
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
