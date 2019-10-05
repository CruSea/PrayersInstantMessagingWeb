import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {DashboardsComponent} from './dashboards/dashboards.component';
import {UsersComponent} from './users/users.component';
import {SentMessagesComponent} from './sent-messages/sent-messages.component';
import {ReceivedMessagesComponent} from './received-messages/received-messages.component';
import {SettingsComponent} from './settings/settings.component';
import {ComponentsModule} from '../components/components.module';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatTabsModule} from '@angular/material/tabs';
import {NgxLoadingModule} from 'ngx-loading';
import {NewUserDialogComponent} from './users/new-user-dialog/new-user-dialog.component';
import {UpdateUserDialogComponent} from './users/update-user-dialog/update-user-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        AdminPagesRoutingModule,
        ComponentsModule,
        FormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressBarModule,
        MatCardModule,
        MatDialogModule,
        MatDividerModule,
        MatListModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatExpansionModule,
        MatBadgeModule,
        MatCheckboxModule,
        MatMenuModule,
        MatIconModule,
        MatPaginatorModule,
        MatTabsModule,
        MatRadioModule,
        MatStepperModule,
        NgxLoadingModule.forRoot({}),
    ],
    declarations: [DashboardsComponent, UsersComponent, SentMessagesComponent, ReceivedMessagesComponent, SettingsComponent,
        NewUserDialogComponent, UpdateUserDialogComponent],
    entryComponents: [NewUserDialogComponent, UpdateUserDialogComponent]
})
export class AdminPagesModule {
}
