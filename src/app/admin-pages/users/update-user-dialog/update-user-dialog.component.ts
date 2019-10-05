import {Component, Inject, OnInit} from '@angular/core';
import {User, UserRole} from '../users.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {
  public selected_user: User = new User();
  public user_roles_list: UserRole[] = [];
  constructor(public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) this_user: User, private userService: UsersService) {
    this.selected_user = this_user;
  }
  ngOnInit() {
    this.userService.getUserRolesList();
    this.userService.UserRolesListEmitter.subscribe(
        data => {this.user_roles_list = data; }
    );
  }
  public onSave() {
    this.dialogRef.close(this.selected_user);
  }
  public onClose() {
    this.dialogRef.close();
  }
}
