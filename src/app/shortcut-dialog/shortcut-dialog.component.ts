import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Shortcut} from '../interfaces/shortcuts';
import {Router} from '@angular/router';
import {Skill} from '../interfaces/user';

@Component({
  selector: 'app-shortcut-dialog',
  templateUrl: './shortcut-dialog.component.html',
  styleUrls: ['./shortcut-dialog.component.css']
})
export class ShortcutDialogComponent implements OnInit {
  shortcut = {
    name: '',
    link: '',
  };

  public event: EventEmitter<any> = new EventEmitter();
  constructor(public dialogRef: MatDialogRef<ShortcutDialogComponent>, private _router: Router) { }

  ngOnInit() {
    this.shortcut.link = this._router.url;
    console.log(this.shortcut);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.event.emit({data: this.shortcut});
    this.dialogRef.close();
  }

}
