import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BookDeliveryAdminLayoutComponent } from './layouts/book-delivery-admin-layout/book-delivery-admin-layout.component';
import { BookDeliveryAuthLayoutComponent } from './layouts/book-delivery-auth-layout/book-delivery-auth-layout.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxLoadingModule} from 'ngx-loading';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {HttpRequestsService} from './services/http-requests.service';
import {JwtModule} from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('book_delivery_token');
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgxLoadingModule.forRoot({}),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['example.com'],
        blacklistedRoutes: ['example.com/examplebadroute/']
      }
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    BookDeliveryAdminLayoutComponent,
    BookDeliveryAuthLayoutComponent,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, HttpRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
