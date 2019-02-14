import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {HouseService} from '../../services/house.service';
import {House} from '../../interfaces/house';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

    private _houses: House[];

    constructor(private _router: Router, private _houseService: HouseService) {
        this._houses = [];
        this._houseService.fecthAllHouse().subscribe((_) => this._houses = _);
    }

    routerStep(step: string) {
        console.log(step);
        switch (step) {
            case 'Tableau de bord':
                this.router.navigate(['/']);
                break;
            case 'Travaux':
                this.router.navigate(['/users/tasks']);
                break;
            case 'Résidence':
                this.router.navigate(['/users/houses']);
                break;
            case 'Contact':
                this.router.navigate(['/']);
                break;
            case 'Compte':
                this.router.navigate(['/skills']);
                break;
            case 'Compétences':
                this.router.navigate(['/skills']);
                break;
            case 'Modifier mes informations':
                this.router.navigate(['/update']);
                break;
            case 'Ajouter un logement':
                this.router.navigate(['/users/houses/addhouse']);
                break;
            default :
                let findHouse = 0;
                for (let i = 0 ; i < this._houses.length ; i++) {
                    if (this._houses[i].houseName === step) {
                        findHouse = 1;
                        this._router.navigate(['/users/houses/', this._houses[i].id]);
                        break;
                    }
                }
                if ( findHouse === 0) {
                    this.router.navigate(['/']);
                    break;
                }
                break;
        }
    }

  ngOnInit() {
  }


    get router(): Router {
        return this._router;
    }
}
