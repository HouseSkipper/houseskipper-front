import {Component, Input, OnInit} from '@angular/core';
import {Shortcut} from '../interfaces/shortcuts';
import {INTERLOCUTEUR} from '../shared/shortcut-area/shortcut-area.component';


@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit {
  private _interlocuteur: INTERLOCUTEUR;

  constructor() {
    this._interlocuteur = {} as INTERLOCUTEUR;
  }

  @Input('interlocuteur')
  set interlocuteur(i: INTERLOCUTEUR) {
    this._interlocuteur = i;
  }

  get interlocuteur(): INTERLOCUTEUR {
    return this._interlocuteur;
  }

  ngOnInit() {
  }


}
