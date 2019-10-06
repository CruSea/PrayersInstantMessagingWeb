import {Component, OnInit} from '@angular/core';
import {AuthServicesService} from '../../auth-pages/services/auth-services.service';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/admin/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    { path: '/admin/prayer-messages', title: 'Prayer Message',  icon: 'person', class: '' },
    { path: '/admin/sent-messages', title: 'Sent Messages',  icon: 'mail_outline', class: '' },
    { path: '/admin/received-messages', title: 'Received Messages',  icon: 'textsms', class: '' },
    { path: '/admin/prayers', title: 'Prayers',  icon: 'person', class: '' },
    { path: '/admin/users', title: 'Users',  icon: 'person', class: '' },
    { path: '/admin/settings', title: 'Settings',  icon: 'settings', class: '' },
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor(private authService: AuthServicesService) {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    public logOut() {
        this.authService.logOut();
    }
}
