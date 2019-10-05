import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardsComponent} from './dashboards/dashboards.component';
import {SentMessagesComponent} from './sent-messages/sent-messages.component';
import {ReceivedMessagesComponent} from './received-messages/received-messages.component';
import {UsersComponent} from './users/users.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  { path: 'dashboard',      component: DashboardsComponent },
  { path: 'sent-messages',      component: SentMessagesComponent },
  { path: 'received-messages',      component: ReceivedMessagesComponent },
  { path: 'users',      component: UsersComponent },
  { path: 'settings',      component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule { }
