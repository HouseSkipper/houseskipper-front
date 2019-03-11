import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {House} from '../interfaces/house';
import {Task} from '../interfaces/task';

@Component({
  selector: 'app-task-dialog-confirm',
  templateUrl: './task-dialog-confirm.component.html',
  styleUrls: ['./task-dialog-confirm.component.css']
})
export class TaskDialogConfirmComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<TaskDialogConfirmComponent>,
              @Inject(MAT_DIALOG_DATA) private _task: Task) { }

  get task(): Task {
    return this._task;
  }

    onCancel() {
        this._dialogRef.close();
    }

   get msg(): string {
    return this._dialogRef.id;
   }

    onDelete(task) {
      console.log(task);
        this._dialogRef.close(task);
    }

    onConfirm(task) {
        this._dialogRef.close(task);
    }

  ngOnInit() {
  }

}
