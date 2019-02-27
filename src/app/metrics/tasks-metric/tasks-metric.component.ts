import { Component, OnInit } from '@angular/core';
import {Historic} from '../../interfaces/historic';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../interfaces/user';
import {PhaseService} from '../../services/phase.service';
import {Observable} from 'rxjs';
import {Phase} from '../../interfaces/phase';
import {HistoricService} from '../../services/historic.service';

@Component({
  selector: 'app-tasks-metric',
  templateUrl: './tasks-metric.component.html',
  styleUrls: ['./tasks-metric.component.css']
})
export class TasksMetricComponent implements OnInit {

  private _totalNumber: number;
  private currentUser: User;
  private currentPhases: Historic[];
  private _phasesNb: Map<string, number>;
  private _activeMenu: string;


  constructor(private _authService: AuthenticationService, private _phaseService: PhaseService, private _historicService: HistoricService) {
      this._authService.currentUser.subscribe(u => {
          this.currentUser = u;
          this.getAllCurrentPhases();
          this.getNbPhases();
      });
  }

  ngOnInit() {
    this._activeMenu = 'Mois';
    this._totalNumber = 0;
    this.currentPhases = [];
  }

  getPhases(): Observable<Phase[]> {
     return this._phaseService.getAll();
  }

  getAllCurrentPhases() {
      this._historicService.getAllFromUser(this.currentUser).subscribe(_ => {
          this.currentPhases = _;
          this._totalNumber = this.currentPhases.length;
          console.log('mdr');
      });
  }

    getMonthCurrentPhases() {
        this._historicService.getMonthFromUser(this.currentUser).subscribe(_ => {
            this.currentPhases = _;
            this._totalNumber = this.currentPhases.length;
        });
    }

    getYearCurrentPhases() {
        this._historicService.getYearFromUser(this.currentUser).subscribe(_ => {
            this.currentPhases = _;
            this._totalNumber = this.currentPhases.length;
        });
    }

  getNbPhases() {
      if (!!this.currentPhases) {
          for (const h of this.currentPhases) {
              const histo = h as Historic;
              if (this._phasesNb.has(histo.subphase.sPhaseName)) {
                  this._phasesNb.set(histo.subphase.phase.phaseName, this._phasesNb.get(histo.subphase.phase.phaseName) + 1);
              } else {
                  this._phasesNb.set(histo.subphase.phase.phaseName, 1);
              }
          }
      }
  }

  setActive(button: string) {
      this._activeMenu = button;
      switch (this._activeMenu) {
          case 'Mois':
              this.getAllCurrentPhases();
              break;
          case 'Annee':
              break;
          case 'Tous' :
              break;
      }
  }


    get phasesNb(): Map<string, number> {
        return this._phasesNb;
    }


    get activeMenu(): string {
        return this._activeMenu;
    }


    get totalNumber(): number {
        return this._totalNumber;
    }
}
