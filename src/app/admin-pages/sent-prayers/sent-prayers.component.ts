import {Component, OnInit} from '@angular/core';
import {PaginatedUsers, User} from '../users/users.objects';
import {PaginatedPrayerMessages} from './sent-prayers.objects';
import {PrayerMessagesService} from '../services/prayer-messages.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {NewUserDialogComponent} from '../users/new-user-dialog/new-user-dialog.component';
import {SwalMessagesService} from '../services/swal-messages.service';
import {NewPrayerMessageDialogComponent} from './new-prayer-message-dialog/new-prayer-message-dialog.component';

@Component({
    selector: 'app-sent-prayers',
    templateUrl: './sent-prayers.component.html',
    styleUrls: ['./sent-prayers.component.scss']
})
export class SentPrayersComponent implements OnInit {
    public paginated_prayers_message: PaginatedPrayerMessages = new PaginatedPrayerMessages();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private prayersMessageService: PrayerMessagesService, private dialog: MatDialog, private responseMessageService: SwalMessagesService) {
    }

    ngOnInit() {
      this.updateSentPrayerMessagesComponent();
      this.prayersMessageService.PaginatedPrayersMessagesEmitter.subscribe(
          data => {this.paginated_prayers_message = data;}
      );
    }

    public updateSentPrayerMessagesComponent() {
      this.prayersMessageService.getPaginatedPrayersMessages();
    }
    public updatePaginatedUsersData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.prayersMessageService.getPaginatedPrayersMessagesData(this.paginated_prayers_message.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }
    public addNewPrayerMessage(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = new User();
        const dialogRef = this.dialog.open(NewPrayerMessageDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.prayersMessageService.addNewPrayerMessage(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Prayer Message Added Successfully');
                        this.updateSentPrayerMessagesComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }
}
