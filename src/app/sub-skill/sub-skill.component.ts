import {AfterViewInit, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {SkillsService} from '../services/skills.service';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map, take} from 'rxjs/operators';
import {of} from 'rxjs';
import {Skill, SkillCategory, SubSkill} from '../interfaces/user';
import {MatOptionSelectionChange, MatSort, MatStepper, MatTableDataSource, Sort} from '@angular/material';
import {FormGroup} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
    selector: 'app-sub-skill',
    templateUrl: './sub-skill.component.html',
    styleUrls: ['./sub-skill.component.css']
})
export class SubSkillComponent implements OnInit {

    private _step: number;
    private average: number;
    private generalAverage: number;
    private _skill: Skill;
    private _levels: string[] = ['Non défini', 'Novice', 'Débutant avancé', 'Compétent', 'Efficace', 'Expert'];
    private _descLevels: string[] = [
        'Non défini',
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
    @ViewChild('autosize') autosize: CdkTextareaAutosize;


    constructor(private _skillService: SkillsService, private _route: ActivatedRoute, private _ngZone: NgZone) {
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
                this.setStep(this._skill.nb_works);
            });
    }

    setStep(index: number) {
        for (let i = 1; i <= index; i++) {
            this.stepper.selectedIndex = i;
        }
    }

    triggerResize() {
        // Wait for changes to be applied, then trigger textarea resize.
        this._ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }

    niveau(num: number): string {
        return this._levels[num];
    }

    tooltip(num: number): string {
        return this._descLevels[num];
    }

    save(subskill: SubSkill, level: number) {
        subskill.nb_works = level;
        this._skillService.updateSubSkill(subskill).subscribe();
        this.generalAverage = 0;
        this._skill.skillCategories.forEach(item => {
            this.generalAverage += this.getCategoryAverage(item);
        });
        this.setStep(Math.trunc(this.generalAverage / this._skill.skillCategories.length));
    }



    public getCategoryAverage(skillCat: SkillCategory) {
        this.average = 0;
        skillCat.subSkills.forEach(item => {
            this.average += item.nb_works;
        });
        return Math.trunc(this.average / skillCat.subSkills.length);
    }

    getLevels() {
        return this._levels;
    }
    getSkill() {
        return this._skill;
    }

}
