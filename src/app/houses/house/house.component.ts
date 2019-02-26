import { Component, OnInit } from '@angular/core';
import {HouseService} from '../../services/house.service';
import {House} from '../../interfaces/house';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

    private _dataSource: House[];
    private _displayedColumns = ['House_Name', 'Type', 'Category', 'Lieu', 'NbDocs' , 'Delete', 'Check'];

    constructor(private _houseService: HouseService, private _router: Router) {
    }

    ngOnInit() {
        this._houseService.fecthAllHouse().subscribe((_) => this._dataSource = _);
    }

    get dataSource(): House[] {
        return this._dataSource;
    }

    get displayedColumns(): any {
        return this._displayedColumns;
    }

    delete(id: string) {
        this._houseService.remove(id).subscribe(null, null, () => this.ngOnInit());
    }

    check(house: House): boolean {
        for (let i = 0 ; i < house.rooms.length; i++) {
            if (house.rooms[i].space === 0) {
                return false;
            } else if (house.rooms[i].typeChauffage === '') {
                return false;
            } else if (house.rooms[i].typeChauffage === 'radiateur' && house.rooms[i].nbRadiateur === 0) {
                return false;
            } else if (house.rooms[i].volet === 1 && house.rooms[i].nbVolet === 0) {
                return false;
            } else if (house.rooms[i].nbVolet !== house.rooms[i].nbFenetre + house.rooms[i].nbPorteFenetre ){
                return false;
            }
        }
        if (house.exterieur === 1 && (house.surfaceExterieurGauche + house.surfaceExterieurDroit + house.surfaceExterieurAvant
            + house.surfaceExterieurArriere + house.outsideSpace) === 0) {
            return false;
        } else if (house.classeEnergetique === null ) {
            return false;
        } else if (house.electricite === 0 && house.eolienne === 0 && house.gaz === 0 && house.panneauxPhoto === 0 ) {
            return false;
        } else if (house.constructionYear === 0 || house.surfaceToiture === 0 || house.revetementExterieur === ''
        || house.revetementToiture === '') {
            return false;
        } else {
            return true;
        }
    }


}



