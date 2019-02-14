import {Injectable} from '@angular/core';
import {MenuListService} from './menu-list.service';
import {HouseService} from '../house.service';
import {House} from '../../interfaces/house';

@Injectable({
    providedIn: 'root'
})
export class MainMenuListService implements MenuListService {


    constructor(private _houseService: HouseService) {
    }

    getFields() {
        const fields = [];
        fields.push({title: 'Tableau de bord', values: []});
        fields.push({title: 'Travaux', values: []});
        // fields.push({title: 'Résidence', values: []});
        this.getHouses(fields);
        fields.push({title: 'Contact', values: []});
        fields.push({title: 'Compte', values: ['Compétences', 'Modifier mes informations']});
        return fields;
    }

    private getHouses(fields: any) {
        this._houseService.fecthAllHouse().subscribe((houses: House[]) => {
            const tmpHouses = ['Ajouter un logement'];
            for (let i = 0; i < houses.length; i++) {
                tmpHouses.push(houses[i].houseName);
            }
            fields.push({title: 'Résidence', values: tmpHouses});
        });
    }
}
