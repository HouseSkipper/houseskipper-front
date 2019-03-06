import {Component, OnInit} from '@angular/core';
import {HistoricService} from '../../services/historic.service';

@Component({
    selector: 'app-alert-metric',
    templateUrl: './alert-metric.component.html',
    styleUrls: ['./alert-metric.component.css']
})
export class AlertMetricComponent implements OnInit {

    private _soumissionLongWaiting;
    private _soumissionMediumWaiting;
    private _soumissionSmallWaiting;

    private _evaluationLongWaiting;
    private _evaluationMediumWaiting;
    private _evaluationSmallWaiting;

    private _decisionLongWaiting;
    private _decisionMediumWaiting;
    private _decisionSmallWaiting;

    private _finalisationLongWaiting;
    private _finalisationMediumWaiting;
    private _finalisationSmallWaiting;

    constructor(private _historicService: HistoricService) {
        this._soumissionLongWaiting = [];
        this._soumissionMediumWaiting = [];
        this._soumissionSmallWaiting = [];
        this._evaluationLongWaiting = [];
        this._evaluationMediumWaiting = [];
        this._evaluationSmallWaiting = [];
        this._decisionLongWaiting = [];
        this._decisionMediumWaiting = [];
        this._decisionSmallWaiting = [];
        this._finalisationLongWaiting = [];
        this._finalisationSmallWaiting = [];
        this._finalisationMediumWaiting = [];
    }

    ngOnInit() {
        this._historicService.getAllFromUser().subscribe(_ => {
            const now = new Date();
            for (const h of _) {
                const nbDays =  Math.floor(( now - h.date ) / 86400000);
                switch (h.currentPhase) {
                    case 'Soumission':
                        // soumission

                        break;
                    case 'Evaluation':
                        // evaluation
                        break;
                    case 'Decision':
                        // decision
                        break;
                    case 'Finalisation' :
                        // finalisation
                        break;
                }
            }
        });
    }


    get soumissionLongWaiting() {
        return this._soumissionLongWaiting;
    }

    get soumissionMediumWaiting() {
        return this._soumissionMediumWaiting;
    }

    get soumissionSmallWaiting() {
        return this._soumissionSmallWaiting;
    }

    get evaluationLongWaiting() {
        return this._evaluationLongWaiting;
    }

    get evaluationMediumWaiting() {
        return this._evaluationMediumWaiting;
    }

    get evaluationSmallWaiting() {
        return this._evaluationSmallWaiting;
    }

    get decisionLongWaiting() {
        return this._decisionLongWaiting;
    }

    get decisionMediumWaiting() {
        return this._decisionMediumWaiting;
    }

    get decisionSmallWaiting() {
        return this._decisionSmallWaiting;
    }

    get finalisationLongWaiting() {
        return this._finalisationLongWaiting;
    }

    get finalisationMediumWaiting() {
        return this._finalisationMediumWaiting;
    }

    get finalisationSmallWaiting() {
        return this._finalisationSmallWaiting;
    }
}
