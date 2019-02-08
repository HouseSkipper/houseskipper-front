import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

    constructor(private _router: Router) {

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
        }
    }

  ngOnInit() {
  }


    get router(): Router {
        return this._router;
    }
}
