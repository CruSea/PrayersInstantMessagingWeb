import { Component, OnInit } from '@angular/core';
import {AuthServicesService} from '../services/auth-services.service';
import {AuthCallback, RegisterUser} from '../login/login.objects';
import {Router} from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public new_register_user = new RegisterUser();
  public loading = false;
  constructor(private authService: AuthServicesService, private router: Router) { }
  ngOnInit() {
    this.authService.RegisterEmitter.subscribe(
        data => {this.processAuthCallBack(data)}
    );
  }
  public registerUser() {
    this.loading = true;
    this.authService.registerUser(this.new_register_user);
  }
  private processAuthCallBack(authCall: AuthCallback) {
    console.log(authCall);
    if (authCall.isValid) {
      this.router.navigate(['/auth/login']);
    } else {
      this.loading = false;
      this.new_register_user = new RegisterUser();
      swal({
        title: authCall.error,
        text: authCall.message,
        buttonsStyling: true,
        confirmButtonClass: 'btn btn-success'
      });
    }
  }
}
