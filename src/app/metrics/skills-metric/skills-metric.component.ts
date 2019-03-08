import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SkillsService} from '../../services/skills.service';
import {Skill} from '../../interfaces/user';

@Component({
    selector: 'app-skills-metric',
    templateUrl: './skills-metric.component.html',
    styleUrls: ['./skills-metric.component.css']
})
export class SkillsMetricComponent implements OnInit {

    gaugeType = 'semi';
    gaugeValue = 28.3;
    gaugeLabel = 'Nombre de travaux';
    gaugeAppendText = '';
    gaugeSize = 175;
    gaugeForeColor = '#A0ADCD';
    gaugeMax = 4;
    gaugeThick = 10;

    private _currentSkills: Skill[];

    constructor(private _skillsService: SkillsService) {
    }

    getSkills() {
        this._skillsService.fetchAll().subscribe(_ => {
            this._currentSkills = _;
        });
    }

    ngOnInit() {
        this.getSkills();
    }


    get currentSkills(): Skill[] {
        return this._currentSkills;
    }
}
