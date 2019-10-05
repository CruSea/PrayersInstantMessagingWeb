import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPagesRoutingModule } from './auth-pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRippleModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ComponentsModule} from '../components/components.module';
import {NgxLoadingModule} from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    AuthPagesRoutingModule,
    ComponentsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent]
})
export class AuthPagesModule { }
