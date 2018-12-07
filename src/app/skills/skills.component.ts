import {Component, OnInit } from '@angular/core';
import { Skill } from '../interfaces/user';
import {SkillsService} from '../services/skills.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
    private _model: Skill[];

    constructor(private _skillService: SkillsService, private _router: Router) {
    }

    ngOnInit() {
        this._skillService.fetchAll().subscribe((skills: Skill[]) => this._model = skills);
    }
    get skills(): Skill[] {
        // console.log(this._model);

        return this._model;
    }

    /**
     * Function to emit event to submit form and person
     */
    submit(skill: Skill) {
        this._skillService.update(skill).subscribe((_) => console.log(_));
    }

}
