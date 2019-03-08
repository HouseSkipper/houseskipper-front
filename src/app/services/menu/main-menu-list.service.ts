import {EventEmitter, Injectable} from '@angular/core';
import {MenuListService} from './menu-list.service';
import {SkillsService} from '../skills.service';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {NavItem} from '../../interfaces/user';

@Injectable({
    providedIn: 'root'
})
export class MainMenuListService implements MenuListService {
    public appDrawer: any;
    public currentUrl = new BehaviorSubject<string>(undefined);
    private _childrenSkills = [];

    constructor(private router: Router, private _skillServices: SkillsService) {
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.currentUrl.next(event.urlAfterRedirects);
            }
        });
        this._childrenSkills = [];
        this._childrenSkills.push({
            displayName: 'Informations personnelles',
            iconName: 'turned_in_not',
            route: '/infos/update',
        });
        this._skillServices.fetchAll().subscribe( skills => {
            for (const skill of skills ) {
                this._childrenSkills.push({
                    displayName: skill.type,
                    iconName: 'turned_in_not',
                    route: 'infos/update/skills/' + skill.id,
                });
            }
        });
    }

    public closeNav() {
        this.appDrawer.close();
    }

    public openNav() {
        this.appDrawer.open();
    }

    getMenuEntriesCollapse() {
        const navItems: NavItem[] = [
            {
                displayName: '',
                iconName: 'dashboard',
                route: '/dashboard',
                children: []
            },
            {
                displayName: '',
                iconName: 'help_outline',
                route: '/help',
                children: []
            },
            {
                displayName: '',
                iconName: 'infos',
                route: '/infos/update',
                children: []
            },
            {
                displayName: '',
                iconName: 'today',
                route: '/users/tasks',
                children: []
            },
            {
                displayName: '',
                iconName: 'location_city',
                route: '/users/houses',
                children: []
            },

        ];
        return navItems;
    }

    getMenuEntries() {
        const navItems: NavItem[] = [
            {
                displayName: 'Tableau de bord',
                iconName: 'dashboard',
                route: '/dashboard',
                children: []
            },
            {
                displayName: 'Besoin d’aide',
                iconName: 'help_outline',
                route: '/help',
                children: []
            },
            {
                displayName: 'Mes informations',
                iconName: 'infos',
                route: '/infos/update',
                children: this._childrenSkills
            },
            {
                displayName: 'Mes travaux',
                iconName: 'today',
                route: '/users/tasks',
                children: [{
                    displayName: 'Ajouter',
                    iconName: 'add',
                    route: '/users/tasks/addtask',
                }]
            },
            {
                displayName: 'Mes habitations',
                iconName: 'location_city',
                route: '/users/houses',
                children: [{
                    displayName: 'Ajouter',
                    iconName: 'add',
                    route: '/users/houses/addHouse',
                }]
            },

        ];
        return navItems;
    }
    public getFields() {
    }
}
