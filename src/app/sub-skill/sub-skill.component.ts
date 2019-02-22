import {Component, OnInit, ViewChild} from '@angular/core';
import {SkillsService} from '../services/skills.service';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Skill, SubSkill} from '../interfaces/user';
import {MatSort, MatTableDataSource, Sort} from '@angular/material';

@Component({
    selector: 'app-sub-skill',
    templateUrl: './sub-skill.component.html',
    styleUrls: ['./sub-skill.component.css']
})
export class SubSkillComponent implements OnInit {

    private _skill: Skill;
    private _sortedData: SubSkill[];

    constructor(private _skillService: SkillsService, private _route: ActivatedRoute) {
        this._skill = {} as Skill;
        this._sortedData = [];
    }


    get sortedData(): SubSkill[] {
        return this._sortedData;
    }

    ngOnInit() {
        this._route.params
            .pipe(
                map((params: any) => params.id),
                flatMap((id: string) => id === undefined ? of(undefined) : this._skillService.fetchOneSkill(id))
            )
            .subscribe((skill: Skill) => {
                this._skill = skill;
                this._sortedData = this._skill.subSkills;
            });
    }

    niveau(num: number): string {
        let res = 'Novice';
        switch (num) {
            case 1:
                res = 'Novice';
                break;
            case 2:
                res = 'Débutant avancé';
                break;
            case 3:
                res = 'Compétent';
                break;
            case 4:
                res = 'Efficace';
                break;
            case 5:
                res = 'Expert';
                break;
        }
        return res;
    }

    tooltip(num: number): string {
        let res = 'Personne qui possède peu ou aucune expérience dans' +
            ' le domaine et a besoin d’un guide pour assurer un suivi des travaux.';
        switch (num) {
            case 1:
                res = 'Personne qui possède peu ou aucune expérience dans' +
                    ' le domaine et a besoin d’un guide pour assurer un suivi des travaux.';
                break;
            case 2:
                res = 'Personne qui possède un peu d’expérience dans' +
                    ' le domaine mais reste dépendante d’un guide pour assurer un suivi des travaux.';
                break;
            case 3:
                res = 'Personne qui commence à avoir un nombre suffisant d’expériences dans' +
                    ' le domaine pour réaliser un suivi éclairé des travaux.';
                break;
            case 4:
                res = 'Personne qui possède une expérience suffisante du domaine pour' +
                    ' savoir ce qu’il faut faire dans la plupart des cas pour réaliser un suivi des travaux.';
                break;
            case 5:
                res = 'Personne qui possède suffisamment d’expérience dans le domaine' +
                    ' pour savoir précisément ce qu’il faut faire pour réaliser un suivi des travaux.';
                break;
        }
        return res;
    }

    save(element: SubSkill) {
        this._skillService.updateSubSkill(element).subscribe();
    }

    sortData(sort: Sort) {
        const data = this._sortedData.slice();
        if (!sort.active || sort.direction === '') {
            this._sortedData = data;
            return;
        }

        this._sortedData = data.sort((a, b) => {
            const isAsc = sort.direction === 'asc';
            switch (sort.active) {
                case 'nom': return compare(a.type, b.type, isAsc);
                case 'niveau': return compare(a.nb_works, b.nb_works, isAsc);
                default: return 0;
            }
        });
    }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

