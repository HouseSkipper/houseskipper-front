import {Component, EventEmitter, HostBinding, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MenuListService} from '../services/menu/menu-list.service';
import {MainMenuListService} from '../services/menu/main-menu-list.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavItem} from '../interfaces/user';

@Component({
    selector: 'app-main-side-menu',
    templateUrl: './main-side-menu.component.html',
    animations: [
        trigger('indicatorRotate', [
            state('collapsed', style({transform: 'rotate(0deg)'})),
            state('expanded', style({transform: 'rotate(180deg)'})),
            transition('expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
            ),
        ])
    ],
    styleUrls: ['./main-side-menu.component.scss'],
    providers: [
        { provide: MenuListService, useClass: MainMenuListService }
    ]
})
export class MainSideMenuComponent implements OnInit {
    expanded: boolean;
    @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
    @Input() item: NavItem;
    @Input() depth: number;


    constructor(private menuListService: MainMenuListService, public router: Router) {
        if (this.depth === undefined) {
            this.depth = 0;
        }
    }

    ngOnInit(): void {
        this.menuListService.currentUrl.subscribe((url: string) => {
            if (this.item.route && url) {
                 // console.log(`Checking '${this.item.route}' against '${url}'`);
                this.expanded = url.indexOf(`${this.item.route}`) === 0;
                this.ariaExpanded = this.expanded;
                 // console.log(`${this.item.route} is expanded: ${this.expanded}`);
            }
        });
    }

    onItemSelected(item: NavItem) {
        // console.log(item);
        if (!item.children || !item.children.length) {
            // console.log('ITEM ROUTE :: ' + item.route);
            this.router.navigate([item.route]);
            // console.log('==== No child');
            // this.menuListService.closeNav();
        }
        if (item.children && item.children.length) {
            // console.log(item.route);
            // console.log('==== Child');
            this.expanded = true;
            this.router.navigate([item.route]);
        }
    }


}
