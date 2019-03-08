import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {NavItem} from '../../interfaces/user';
import {MainMenuListService} from '../../services/menu/main-menu-list.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent implements AfterViewInit {
    @ViewChild('appDrawer') appDrawer: ElementRef;

    navItems: NavItem[];
    navItemCollapse: NavItem[];
    sidenavWidth = 3;
    sidenavWidthRight = 2;
    opened = false;

    constructor(private navService: MainMenuListService) {
        this.navItems = navService.getMenuEntries();
        this.navItemCollapse =  navService.getMenuEntriesCollapse();
    }

    ngAfterViewInit() {
        this.navService.appDrawer = this.appDrawer;
    }

    toggle() {
        if (this.sidenavWidth < 4) {
            this.sidenavWidth = 15;
        } else {
            this.sidenavWidth = 3;
        }
    }

    increaseR() {
        this.sidenavWidthRight = 15;
    }

    decreaseR() {
        this.sidenavWidthRight = 2;
    }

    open() {
        this.opened = !this.opened;
    }

}
