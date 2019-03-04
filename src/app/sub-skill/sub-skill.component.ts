import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SkillsService} from '../services/skills.service';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Skill, SubSkill} from '../interfaces/user';
import {MatSort, MatStepper, MatTableDataSource, Sort} from '@angular/material';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-sub-skill',
    templateUrl: './sub-skill.component.html',
    styleUrls: ['./sub-skill.component.css']
})
export class SubSkillComponent implements OnInit {

    private _step: number;
    private _skill: Skill;
    private _levels: string[] = ['Novice', 'Débutant avancé', 'Compétent', 'Efficace', 'Expert'];
    private _descLevels: string[] = [
        'Personne qui possède peu ou aucune expérience dans ' +
    'le domaine et a besoin d’un guide pour assurer un suivi des travaux.',
        'Personne qui possède peu ou aucune expérience dans' +
        ' le domaine et a besoin d’un guide pour assurer un suivi des travaux.',
        'Personne qui possède un peu d’expérience dans' +
        ' le domaine mais reste dépendante d’un guide pour assurer un suivi des travaux.',
        'Personne qui possède une expérience suffisante du domaine pour' +
        ' savoir ce qu’il faut faire dans la plupart des cas pour réaliser un suivi des travaux.',
        'Personne qui possède suffisamment d’expérience dans le domaine' +
        ' pour savoir précisément ce qu’il faut faire pour réaliser un suivi des travaux.'
    ];
    @ViewChild('stepper') stepper: MatStepper;

    constructor(private _skillService: SkillsService, private _route: ActivatedRoute) {
        this._skill = {} as Skill;
    }


    ngOnInit() {
        this._route.params
            .pipe(
                map((params: any) => params.id),
                flatMap((id: string) => id === undefined ? of(undefined) : this._skillService.fetchOneSkill(id))
            )
            .subscribe(_ => {
                console.log(_);
                this._skill = _;
            });
    }

    setStep(index: number) {
        // console.log('set ' + index);
        this._step = index;
        this.stepper.selectedIndex = this.stepMatStepper();
    }

    nextStep() {
        this._step++;
        this.stepper.selectedIndex = this.stepMatStepper();
    }

    prevStep() {
        this._step--;
        this.stepper.selectedIndex = this.stepMatStepper();
    }

    niveau(num: number): string {
        return this._levels[num];
    }

    tooltip(num: number): string {
        return this._descLevels[num];
    }

    save(subskill: SubSkill) {
        console.log(subskill);
        this._skillService.updateSubSkill(subskill).subscribe();
    }

    public stepMatStepper(): number {
        // console.log('entre dans stepMats');
        if (this._step < 2) {
            return this._step;
        } else if (this._step === 2) {
            return 1;
        }  else if (this._step === 3) {
            return 2;
        }
    }

    getLevels() {
        return this._levels;
    }
    getSkill() {
        return this._skill;
    }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
