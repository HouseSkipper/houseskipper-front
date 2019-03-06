import {Component, OnInit} from '@angular/core';
import {Historic} from '../../interfaces/historic';
import {AuthenticationService} from '../../services/authentication.service';
import {User} from '../../interfaces/user';
import {PhaseService} from '../../services/phase.service';
import {Observable} from 'rxjs';
import {Phase} from '../../interfaces/phase';
import {HistoricService} from '../../services/historic.service';
import {TasksService} from '../../services/tasks.service';

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
    private _phases: Phase[];


    constructor(private _authService: AuthenticationService, private _phaseService: PhaseService, private _historicService: HistoricService) {
        this._authService.currentUser.subscribe(u => {
            this.currentUser = u;
        });
    }

    ngOnInit() {
        this._activeMenu = 'Mois';
        this._totalNumber = 0;
        this.currentPhases = [];
        this._phasesNb = new Map();
        this.init();
    }

    getPhases(): Observable<any> {
        return this._phaseService.getAll();
    }

    getAllCurrentPhases() {
        this._historicService.getAllFromUser().subscribe(_ => {
            this.currentPhases = _;
            this._totalNumber = this.currentPhases.length;
            this.refreshMetrics();
        });
    }

    getMonthCurrentPhases() {
        this._historicService.getMonthFromUser().subscribe(_ => {
            this.currentPhases = _;
            this._totalNumber = this.currentPhases.length;
            this.refreshMetrics();
        });

    }

    getYearCurrentPhases() {
        this._historicService.getYearFromUser().subscribe(_ => {
            this.currentPhases = _;
            this._totalNumber = this.currentPhases.length;
            this.refreshMetrics();
        });
    }

    refreshMetrics() {
        for (const k of Array.from(this._phasesNb.keys())) {
                this._phasesNb.set(k, 0);
        }
        if (!!this.currentPhases) {
            for (const h of this.currentPhases) {
                if (this._phasesNb.get(h.currentPhase) !== 0) {
                    this._phasesNb.set(h.currentPhase, this._phasesNb.get(h.currentPhase) + 1);
                } else {
                    this._phasesNb.set(h.currentPhase, 1);
                }
            }
        }
    }


    init() {
        this.getPhases().subscribe(_ => {
            console.log(_);
            this._phases = _;
            for (const p of _) {
                this._phasesNb.set(p.phaseName, 0);
            }
            this.getMonthCurrentPhases();
        });
    }

    getNbPhase(phase: string) {
        return this._phasesNb.get(phase);
    }

    setActive(button: string) {
        this._activeMenu = button;
        switch (this._activeMenu) {
            case 'Mois':
                this.getMonthCurrentPhases();
                break;
            case 'Annee':
                this.getYearCurrentPhases();
                break;
            case 'Tous' :
                this.getAllCurrentPhases();
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


    get phases(): Phase[] {
        return this._phases;
    }
}
