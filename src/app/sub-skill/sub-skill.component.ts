import {Component, OnInit, ViewChild} from '@angular/core';
import {SkillsService} from '../services/skills.service';
import {ActivatedRoute} from '@angular/router';
import {flatMap, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {Skill, SubSkill} from '../interfaces/user';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'app-sub-skill',
    templateUrl: './sub-skill.component.html',
    styleUrls: ['./sub-skill.component.css']
})
export class SubSkillComponent implements OnInit {

    private _skill: Skill;
    dataSource: MatTableDataSource<SubSkill>;
    displayedColumns: string[] = ['Nom', 'Niveau', 'Gérer'];
    @ViewChild(MatSort) sort: MatSort;

    constructor(private _skillService: SkillsService, private _route: ActivatedRoute) {
        this._skill = {} as Skill;
    }

    ngOnInit() {
        this._route.params
            .pipe(
                map((params: any) => params.id),
                flatMap((id: string) => id === undefined ? of(undefined) : this._skillService.fetchOneSkill(id))
            )
            .subscribe((skill: Skill) => {
                this._skill = skill;
                this.dataSource = new MatTableDataSource(this._skill.subSkills);
                this.dataSource.sort = this.sort;
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

}

