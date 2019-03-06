import { Component, OnInit } from '@angular/core';
import {Shortcut} from '../../interfaces/shortcuts';
import {ShortcutsService} from '../../services/shortcuts.service';
import {Router} from '@angular/router';
import {ShortcutDialogComponent} from '../../shortcut-dialog/shortcut-dialog.component';
import {MatDialog} from '@angular/material';
import {TaskDataSource} from '../../task/task.component';

@Component({
  selector: 'app-shortcut-area',
  templateUrl: './shortcut-area.component.html',
  styleUrls: ['./shortcut-area.component.css']
})
export class ShortcutAreaComponent implements OnInit {

  private _model: Shortcut[];

  constructor(private _shortcutService: ShortcutsService, public dialog: MatDialog, private _router: Router) { }

  ngOnInit() {
    this._shortcutService.fetchAll().subscribe((shortcuts: Shortcut[]) => this._model = shortcuts);
  }

  get shortcuts(): Shortcut[] {
    return this._model;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ShortcutDialogComponent, {
      width: '600px',
      data: ''
    });
    dialogRef.componentInstance.event.subscribe((result) => {
      this._shortcutService.create(result.data).subscribe(() => {
        this._shortcutService.fetchAll().subscribe((shortcuts: Shortcut[]) => {
          this._model = shortcuts;
        });
      });
    });
  }


}
