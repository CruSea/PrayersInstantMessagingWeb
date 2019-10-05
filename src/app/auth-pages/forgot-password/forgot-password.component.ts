import { Component, OnInit } from '@angular/core';
import swal from "sweetalert2";
import {ResetUser} from '../login/login.objects';
import {AuthServicesService} from '../services/auth-services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  public new_reset_user = new ResetUser();
  public new_reset_code = new ResetUser();
  public loading = false;
  constructor(private authService: AuthServicesService, private router: Router) { }

  ngOnInit() {
  }
  public getResetCode() {
    this.loading = true;
    this.authService.getResetCode(this.new_reset_code).subscribe(
        data => {this.loading = false;
          swal({
            title: 'Reset-Code Sent!',
            text: 'We have just sent you a reset code',
            buttonsStyling: true,
            confirmButtonClass: 'btn btn-success'
          });
        },
        error => {
          this.loading = false;
          swal({
            title: 'Whoops! No Reset Code',
            text: 'We are unable to send you a reset code! please try again',
            buttonsStyling: true,
            confirmButtonClass: 'btn btn-error'
          });
        }
    );
  }
  public resetPassword() {
    this.loading = true;
    this.authService.resetPassword(this.new_reset_user).subscribe(
        data => {this.loading = false;
          swal({
            title: 'Successfully Changed!',
            text: 'you have changed your login credentials',
            buttonsStyling: true,
            confirmButtonClass: 'btn btn-success'
          });
          this.new_reset_user = new ResetUser();
          this.router.navigate(['/auth/login'])
        },
        error => {
          this.loading = false;
          swal({
            title: 'Whoops! Failed to change',
            text: 'We are unable to change your login credential! please try again',
            buttonsStyling: true,
            confirmButtonClass: 'btn btn-error'
          });
        }
    );
  }

}
