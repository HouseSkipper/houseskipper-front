import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';
import {HouseService} from '../../services/house.service';
import {House} from '../../interfaces/house';
import {forEach} from '@angular/router/src/utils/collection';
import {TasksService} from '../../services/tasks.service';
import {Task} from '../../interfaces/task';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

    private _houses: House[];
    private _tasks: Task[];

    constructor(private _router: Router, private _houseService: HouseService, private _tasksService: TasksService) {
        this._houses = [];
        this._tasks = [];
        this._tasksService.getAll().subscribe((_) => this._tasks = _);
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
            case 'Habitation':
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
            case 'Ajouter une habitation':
                this.router.navigate(['/users/houses/addhouse']);
                break;
            case 'Ajouter une demande de travaux':
                this.router.navigate(['/users/tasks/addtask']);
                break;
                /* Plus besoin
            default :
                let findHouse = 0;
                let findTask = 0;
                for (let i = 0 ; i < this._houses.length ; i++) {
                    if (this._houses[i].houseName === step) {
                        findHouse = 1;
                        this._router.navigate(['/users/houses/', this._houses[i].id]);
                        break;
                    }
                }
                for (let i = 0 ; i < this._tasks.length ; i++) {
                    if (this._tasks[i].nom === step) {
                        findTask = 1;
                        this._router.navigate(['/users/tasks/' + this._tasks[i].id]);
                        break;
                    }
                }
                if ( findHouse === 0 && findTask === 0) {
                    this.router.navigate(['/']);
                    break;
                }
                break;
                */
        }
    }

  ngOnInit() {
  }


    get router(): Router {
        return this._router;
    }
}
