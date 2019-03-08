import { Component, OnInit } from '@angular/core';
import {Shortcut} from '../../interfaces/shortcuts';
import {ShortcutsService} from '../../services/shortcuts.service';
import {Router} from '@angular/router';
import {ShortcutDialogComponent} from '../../shortcut-dialog/shortcut-dialog.component';
import {MatDialog} from '@angular/material';
import {TaskDataSource} from '../../task/task.component';

export interface INTERLOCUTEUR {
  name: string;
  picture: string;
  email: string;
  function: string;
}

const INTERLOCUTEURS: INTERLOCUTEUR[] = [
  {name: 'Paul Conducteur', picture: '', email: 'paul.conducteur@houseskippers.com', function: 'Conducteur de travaux'},
  {name: 'Pierre Courtier', picture: '', email: 'pierre.courtier@houseskippers.com', function: 'Courtier en travaux'},
  {name: 'Albert Conseiller', picture: '', email: 'albert.conseiller@houseskippers.com', function: 'Conseiller-Expert'},
  {name: 'Denis Banque', picture: '', email: 'denis.banque@houseskippers.com', function: 'Contact banque'},
  {name: 'Louis Assurance', picture: '', email: 'louis.assurance@houseskippers.com', function: 'Contact assurance'},
  {name: 'Eric Juriste', picture: '', email: 'eric.juriste@houseskippers.com', function: 'Contact juriste'},
  {name: 'Loïc Support', picture: '', email: 'loic.support@houseskippers.com', function: 'Agent de support'},
];

@Component({
  selector: 'app-shortcut-area',
  templateUrl: './shortcut-area.component.html',
  styleUrls: ['./shortcut-area.component.css']
})
export class ShortcutAreaComponent implements OnInit {

  /*
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
  */

  private _interlocuteurs: INTERLOCUTEUR[];

  constructor() {
    this._interlocuteurs = INTERLOCUTEURS;
  }

  get interlocuteurs(): INTERLOCUTEUR[] {
    return this._interlocuteurs;
  }

  ngOnInit(): void {
  }


}
