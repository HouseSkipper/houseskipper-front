import {Component, OnInit} from '@angular/core';
import {HistoricService} from '../../services/historic.service';

@Component({
    selector: 'app-alert-metric',
    templateUrl: './alert-metric.component.html',
    styleUrls: ['./alert-metric.component.css']
})
export class AlertMetricComponent implements OnInit {

    private static LONG_WAITING = 30;
    private static MEDIUM_WAITING = 15;

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
        this.clearAll();
        this._historicService.getAllFromUser().subscribe(_ => {
            const now = new Date();
            for (const h of _) {
                const nbDays =  Math.floor(( now - h.date ) / 86400000);
                switch (h.currentPhase) {
                    case 'Soumission':
                        // soumission
                        if (nbDays >= AlertMetricComponent.LONG_WAITING) {
                            this._soumissionLongWaiting.push(h);
                        } else if (nbDays >= AlertMetricComponent.MEDIUM_WAITING) {
                            this._soumissionMediumWaiting.push(h);
                        } else {
                            this._soumissionSmallWaiting.push(h);
                        }
                        break;
                    case 'Evaluation':
                        if (nbDays >= AlertMetricComponent.LONG_WAITING) {
                            this._evaluationLongWaiting.push(h);
                        } else if (nbDays >= AlertMetricComponent.MEDIUM_WAITING) {
                            this._evaluationMediumWaiting.push(h);
                        } else {
                            this._evaluationSmallWaiting.push(h);
                        }
                        break;
                    case 'Decision':
                        if (nbDays >= AlertMetricComponent.LONG_WAITING) {
                            this._decisionLongWaiting.push(h);
                        } else if (nbDays >= AlertMetricComponent.MEDIUM_WAITING) {
                            this._decisionMediumWaiting.push(h);
                        } else {
                            this._decisionSmallWaiting.push(h);
                        }
                        break;
                    case 'Finalisation' :
                        if (nbDays >= AlertMetricComponent.LONG_WAITING) {
                            this._finalisationLongWaiting.push(h);
                        } else if (nbDays >= AlertMetricComponent.MEDIUM_WAITING) {
                            this._finalisationMediumWaiting.push(h);
                        } else {
                            this._finalisationSmallWaiting.push(h);
                        }
                        break;
                }
            }
        });
    }

    clearAll() {
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
