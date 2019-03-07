import {Component, Input, OnInit} from '@angular/core';
import {Shortcut} from '../interfaces/shortcuts';


export interface INTERLOCUTEUR {
  name: string;
  picture: string;
  email: string;
  function: string;
}

const interlocuteurs: INTERLOCUTEUR[] = [
  {name: 'Paul Conducteur', picture: '', email: 'paul.conducteur@houseskippers.com', function: 'Conducteur de travaux'},
  {name: 'Pierre Courtier', picture: '', email: 'pierre.courtier@houseskippers.com', function: 'Courtier en travaux'},
  {name: 'Albert Conseiller', picture: '', email: 'albert.conseiller@houseskippers.com', function: 'Conseiller-Expert'},
  {name: 'Denis Banque', picture: '', email: 'denis.banque@houseskippers.com', function: 'Contact banque'},
  {name: 'Louis Assurance', picture: '', email: 'louis.assurance@houseskippers.com', function: 'Contact assurance'},
  {name: 'Eric Juriste', picture: '', email: 'eric.juriste@houseskippers.com', function: 'Contact juriste'},
  {name: 'Loïc Support', picture: '', email: 'loic.support@houseskippers.com', function: 'Agent de support'},
];

@Component({
  selector: 'app-shortcut',
  templateUrl: './shortcut.component.html',
  styleUrls: ['./shortcut.component.css']
})
export class ShortcutComponent implements OnInit {
  private _interlocuteur: INTERLOCUTEUR[];

  constructor() {
    this._interlocuteur = interlocuteurs;
  }

  get interlocuteur(): INTERLOCUTEUR[] {
    return this._interlocuteur;
  }

  ngOnInit() {
  }


}
