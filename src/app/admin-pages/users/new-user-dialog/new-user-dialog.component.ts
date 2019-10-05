import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../users.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit {
  public new_user = new User();
  constructor(public dialogRef: MatDialogRef<NewUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) new_user: User) { }

  ngOnInit() {
  }
  public onSave() {
    this.dialogRef.close(this.new_user);
  }
  public onClose() {
    this.dialogRef.close();
  }
}
