import {Injectable} from '@angular/core';
import {MenuListService} from './menu-list.service';
import {HouseService} from '../house.service';
import {House} from '../../interfaces/house';
import {TasksService} from '../tasks.service';
import {Task} from '../../interfaces/task';

@Injectable({
    providedIn: 'root'
})
export class MainMenuListService implements MenuListService {


    constructor(private _houseService: HouseService, private _tasksService: TasksService) {
    }

    getFields() {
        const fields = [];
        fields.push({title: 'Tableau de bord', values: []});
        // this.getTasks(fields);
        fields.push({title: 'Habitation', values: ['Ajouter une habitation']});
        fields.push({title: 'Travaux', values: ['Ajouter une demande de travaux']});
        // this.getHouses(fields);
        fields.push({title: 'Contact', values: []});
        fields.push({title: 'Compte', values: ['Compétences', 'Modifier mes informations']});
        return fields;
    }

    /* Plus besoin
    private getHouses(fields: any) {
        this._houseService.fecthAllHouse().subscribe((houses: House[]) => {
            const tmpHouses = ['Ajouter un logement'];
            for (let i = 0; i < houses.length; i++) {
                // const html = '<a [routerLink]="[\'/users/houses\',\'' + houses[i].id + '\']">' + houses[i].houseName + '</a>';
                tmpHouses.push(houses[i].houseName);
            }
            fields.push({title: 'Résidence', values: tmpHouses});
        });
    }

    private getTasks(fields: any) {
        this._tasksService.getAll().subscribe((tasks: Task[]) => {
                const t = ['Ajouter une demande de travaux'];
                for (let i = 0; i < tasks.length; i++) {
                    t.push(tasks[i].nom);
                }
                fields.push({title: 'Travaux', values: t});
            }
        );
    }
    */
}
