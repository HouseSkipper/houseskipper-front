import {Component, OnInit} from '@angular/core';
import {HouseService} from '../../services/house.service';
import {House} from '../../interfaces/house';
import {Router} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {MatDialog, MatDialogRef} from '@angular/material';
import {HouseDialogDelete} from '../matDialog/delete/house.dialog.delete';
import {filter, flatMap} from 'rxjs/operators';

@Component({
    selector: 'app-house',
    templateUrl: './house.component.html',
    styleUrls: ['./house.component.css']
})
export class HouseComponent implements OnInit {

    private _dataSource: House[];
    private _displayedColumns = ['House_Name', 'Type', 'Category', 'Lieu', 'NbDocs', 'Delete', 'Check'];
    private _houseDeleteDialog: MatDialogRef<HouseDialogDelete>;

    constructor(private _houseService: HouseService, private _router: Router, private _dialog: MatDialog) {
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

    delete(house: House) {
        this._houseDeleteDialog = this._dialog.open(HouseDialogDelete, {
            width: '500px',
            disableClose: true,
            data: house
        });

        this._houseDeleteDialog.afterClosed()
            .pipe(
                filter(_ => !!_),
                flatMap(_ => this._houseService.remove(_))
            )
            .subscribe(null, null, () => this.ngOnInit());
        // this._houseService.remove(id).subscribe(null, null, () => this.ngOnInit());

    }

    check(house: House): boolean {
        for (let i = 0; i < house.rooms.length; i++) {
            if (house.rooms[i].space === 0) {
                return false;
            } else if (house.rooms[i].typeChauffage === '') {
                return false;
            } else if (house.rooms[i].typeChauffage === 'radiateur' && house.rooms[i].nbRadiateur === 0) {
                return false;
            } else if (house.rooms[i].volet === 1 && house.rooms[i].nbVolet === 0) {
                return false;
            } else if (house.rooms[i].volet === 1 && house.rooms[i].nbVolet > house.rooms[i].nbFenetre + house.rooms[i].nbPorteFenetre) {
                return false;
            }
        }
        if (house.exterieur === 1 && (house.surfaceExterieurGauche + house.surfaceExterieurDroit + house.surfaceExterieurAvant
            + house.surfaceExterieurArriere + house.outsideSpace) === 0) {
            return false;
        } else if (house.classeEnergetique === null) {
            return false;
        } else if (house.electricite === 0 && house.eolienne === 0 && house.gaz === 0 && house.panneauxPhoto === 0) {
            return false;
        } else if (house.constructionYear === 0 || house.surfaceToiture === 0 || house.revetementExterieur === ''
            || house.revetementToiture === '') {
            return false;
        } else if (house.comment === null) {
            return false;
        } else {
            return true;
        }
    }


}



