import { Injectable } from '@angular/core';
import {MenuListService} from './menu-list.service';

@Injectable({
  providedIn: 'root'
})
export class MainMenuListService implements MenuListService {

    constructor() { }

    getFields() {
        const fields = [];
        fields.push({title: 'Tableau de bord', values: []});
        fields.push({title: 'Travaux', values: ['Demande', 'En cours', 'Finalisé']});
        fields.push({title: 'Résidence', values: []});
        fields.push({title: 'Contact', values: []});
        fields.push({title: 'Compte', values: []});
        return fields;
    }
}
