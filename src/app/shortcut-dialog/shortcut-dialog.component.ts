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
  private _shortcut: Shortcut;
  constructor(public dialogRef: MatDialogRef<ShortcutDialogComponent>, private _router: Router) { }

  ngOnInit() {
    // this._shortcut.link = this._router.url;
    // console.log(this._shortcut);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // this.event.emit({data: this.blogTask});
    this.dialogRef.close();
  }

  get shortcut(): Shortcut {
    return this._shortcut;
  }
}
