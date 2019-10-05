import {NgModule} from '@angular/core';
import {CommonModule,} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {BookDeliveryAdminLayoutComponent} from './layouts/book-delivery-admin-layout/book-delivery-admin-layout.component';
import {BookDeliveryAuthLayoutComponent} from './layouts/book-delivery-auth-layout/book-delivery-auth-layout.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full',
    }, {
        path: '',
        component: BookDeliveryAdminLayoutComponent,
        children: [
            {
                path: 'admin',
                loadChildren: './admin-pages/admin-pages.module#AdminPagesModule'
            }]
    }, {
        path: '',
        component: BookDeliveryAuthLayoutComponent,
        children: [
            {
                path: 'auth',
                loadChildren: './auth-pages/auth-pages.module#AuthPagesModule'
            }]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
