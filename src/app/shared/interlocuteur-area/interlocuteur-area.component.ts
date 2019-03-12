import { Component, OnInit } from '@angular/core';
import {INTERLOCUTEUR} from '../../interfaces/interlocuteur';
import {InterlocuteurService} from '../../services/interlocuteur.service';





@Component({
  selector: 'app-interlocuteur-area',
  templateUrl: './interlocuteur-area.component.html',
  styleUrls: ['./interlocuteur-area.component.css']
})
export class InterlocuteurAreaComponent implements OnInit {

  private _interlocuteurs: INTERLOCUTEUR[];

  constructor(private _InterlocuteurService: InterlocuteurService) {
    this._InterlocuteurService.fecthAll().subscribe((_) => this._interlocuteurs = _);
  }

  get interlocuteurs(): INTERLOCUTEUR[] {
    return this._interlocuteurs;
  }

  ngOnInit(): void {
  }


}
