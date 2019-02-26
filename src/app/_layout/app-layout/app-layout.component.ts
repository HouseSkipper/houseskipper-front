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

    constructor(private navService: MainMenuListService) {
        this.navItems = navService.getMenuEntries();
    }

    ngAfterViewInit() {
        this.navService.appDrawer = this.appDrawer;
    }

}
