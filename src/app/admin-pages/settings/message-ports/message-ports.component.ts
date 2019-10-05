import {Component, OnInit} from '@angular/core';
import {PaginatedMessagePorts, MessagePort} from './message-ports.objects';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {User} from '../../users/users.objects';
import {NewUserDialogComponent} from '../../users/new-user-dialog/new-user-dialog.component';
import {UpdateUserDialogComponent} from '../../users/update-user-dialog/update-user-dialog.component';
import {MessagePortsService} from '../../services/message-ports.service';
import {SwalMessagesService} from '../../services/swal-messages.service';
import {NewMessagePortDialogComponent} from './new-message-port-dialog/new-message-port-dialog.component';
import {UpdateMessagePortDialogComponent} from './update-message-port-dialog/update-message-port-dialog.component';

@Component({
    selector: 'app-message-ports',
    templateUrl: './message-ports.component.html',
    styleUrls: ['./message-ports.component.scss']
})
export class MessagePortsComponent implements OnInit {
    public paginated_message_ports = new PaginatedMessagePorts();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private messagePortService: MessagePortsService, private dialog: MatDialog,
                private responseMessageService: SwalMessagesService) {
    }

    ngOnInit() {
        this.updateMessagePortComponent();
    }

    public updateMessagePortComponent() {
        this.messagePortService.getPaginatedMessagePort();
    }

    public updatePaginatedMessagePortsData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.messagePortService.getPaginatedMessagePortData(this.paginated_message_ports.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addNewMessagePortDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = new MessagePort();
        const dialogRef = this.dialog.open(NewMessagePortDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.messagePortService.addNewMessagePort(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Message Port Added Successfully');
                        this.updateMessagePortComponent();
                    },
                    failed => {
                        this.loading = false;
                        this.responseMessageService.displayErrorResponseMessage(failed);
                    }
                );
            }
        });
    }

    public updateUserDialog(port_data: MessagePort): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = port_data;
        const dialogRef = this.dialog.open(UpdateMessagePortDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.messagePortService.updateMessage(result).subscribe(
                    succes => {
                        this.loading = false;
                        this.responseMessageService.showNotification(2, 'top', 'right', 'Message Port Updated Successfully');
                        this.updateMessagePortComponent();
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
