import {Component, Input, OnInit} from '@angular/core';
import {INTERLOCUTEUR} from '../interfaces/interlocuteur';



@Component({
  selector: 'app-interlocuteur',
  templateUrl: './interlocuteur.component.html',
  styleUrls: ['./interlocuteur.component.css']
})
export class InterlocuteurComponent implements OnInit {
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
