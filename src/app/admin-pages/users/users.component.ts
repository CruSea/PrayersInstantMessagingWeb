import { Component, OnInit } from '@angular/core';
import {PaginatedUsers, User} from './users.objects';
import {UsersService} from '../services/users.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import swal from 'sweetalert2';
import {NewUserDialogComponent} from './new-user-dialog/new-user-dialog.component';
import {UpdateUserDialogComponent} from './update-user-dialog/update-user-dialog.component';
import {SwalMessagesService} from '../services/swal-messages.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public paginated_users: PaginatedUsers = new PaginatedUsers();
  public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
  public loading = false;

  constructor(private usersService: UsersService, private dialog: MatDialog, private responseMessageService: SwalMessagesService) { }

  ngOnInit() {
    this.updateUsersComponent();
    this.usersService.PaginatedUsersEmitter.subscribe(
        data => {this.paginated_users = data; this.loading = false; }
    );
  }
  public updateUsersComponent() {
    this.loading = true;
    this.usersService.getPaginatedUsers();
  }
  public updatePaginatedUsersData(event: any) {
    this.loading = true;
    const page_num = event.pageIndex + 1;
    const paginate_size = event.pageSize;
    this.usersService.getPaginatedUsersData(this.paginated_users.path + '?page=' + page_num + '&PAGINATE_SIZE=' + paginate_size);
  }
  public addNewUserDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = new User();
    const dialogRef = this.dialog.open(NewUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.usersService.addNewUser(result).subscribe(
            succes => {
              this.loading = false;
              this.responseMessageService.showNotification(2, 'top', 'right', 'New User Added Successfully');
              this.updateUsersComponent();
            },
            failed => {
              this.loading = false;
              this.responseMessageService.displayErrorResponseMessage(failed);
            }
        );
      }
    });
  }

  public updateUserDialog(selected_user: User): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = selected_user;
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.usersService.updateUser(result).subscribe(
            succes => {
              this.loading = false;
              this.responseMessageService.showNotification(2, 'top', 'right', 'User Updated Successfully');
              this.updateUsersComponent();
            },
            failed => {
              this.loading = false;
              this.responseMessageService.displayErrorResponseMessage(failed);
            }
        );
      }
    });
  }
  public changeUserStatus(user: User) {
    user.is_active = !user.is_active;
    swal({
          title: 'Are you sure?',
          text: 'You are changing user status?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, change it!',
          cancelButtonText: 'No, cancel please!',
        },
    ).then((result) => {
      if (result.value) {
        this.loading = true;
        this.usersService.changeUserStatus(user).subscribe(
            succes => {
              this.responseMessageService.showNotification(4, 'top', 'right', 'User Status Updates');
              this.updateUsersComponent();
            },
            failed => {
              this.responseMessageService.displayErrorResponseMessage(failed);
              this.updateUsersComponent();
            }
        );
      } else  {
        this.updateUsersComponent();
      }
    });
  }
  public removeUser(user: User) {
    swal({
          title: 'Are you sure?',
          text: 'Your will not be able to recover this user account',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel please!',
        },
    ).then((result) => {
      if (result.value) {
        this.loading = true;
        this.usersService.deleteUser(user).subscribe(
            succes => {
              this.responseMessageService.showNotification(4, 'top', 'right', 'User Account Deleted');
              this.updateUsersComponent();
            },
            failed => {
              this.responseMessageService.displayErrorResponseMessage(failed);
              this.updateUsersComponent();
            }
        );
      }
    });
  }

}
