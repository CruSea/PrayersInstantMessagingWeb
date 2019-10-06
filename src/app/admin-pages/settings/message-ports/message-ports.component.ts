import {Component, OnInit} from '@angular/core';
import {PaginatedMessagePorts, MessagePort, Campaign, SmsPort, WebHook} from './message-ports.objects';
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
    public negarit_campaigns: Campaign[] = [];
    public negarit_sms_ports: SmsPort[] = [];
    public loading = false;

    constructor(private messagePortService: MessagePortsService, private dialog: MatDialog,
                private responseMessageService: SwalMessagesService) {
    }

    ngOnInit() {
        this.updateMessagePortComponent();
        this.messagePortService.PaginatedMessagePortsEmitter.subscribe(
            data => {this.paginated_message_ports = data; }
        );
        this.messagePortService.CampaignsEmitter.subscribe(
            data => {
                this.negarit_campaigns = data;
            }
        );
        this.messagePortService.SmsPortsEmitter.subscribe(
            data => {
                this.negarit_sms_ports = data;
            }
        );
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
                this.messagePortService.updateMessagePort(result).subscribe(
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
    public deleteMessagePort (port_data: MessagePort) {
        this.messagePortService.deleteMessagePort(port_data).subscribe(
            succes => {
                this.loading = false;
                this.responseMessageService.showNotification(2, 'top', 'right', 'Message Port Deleted Successfully');
                this.updateMessagePortComponent();
            },
            failed => {
                this.loading = false;
                this.responseMessageService.displayErrorResponseMessage(failed);
            }
        );
    }

    public getCampaignName(api_key: string, campaign_id: number) {
        if (api_key != null && api_key.length > 5  && campaign_id != null) {
            if (this.negarit_campaigns.length === 0) {
                this.messagePortService.getCampaigns(api_key);
            }
            for (let i = 0; i < this.negarit_campaigns.length; i++) {
                if (this.negarit_campaigns[i].id === campaign_id) {
                    return this.negarit_campaigns[i].name;
                }
            }
            return campaign_id;
        } else {
            return 'NONE';
        }
    }

    public getSmsPortName(api_key: string, sms_port_id: number) {
        if (api_key != null && api_key.length > 5 && sms_port_id != null) {
            if (this.negarit_sms_ports.length === 0) {
                this.messagePortService.getSmsPorts(api_key);
            }
            for (let i = 0; i < this.negarit_sms_ports.length; i++) {
                if (this.negarit_sms_ports[i].id === sms_port_id) {
                    return this.negarit_sms_ports[i].name;
                }
            }
            return sms_port_id;
        } else {
            return 'NONE';
        }
    }
    public connectPort(message_port: MessagePort) {
        this.loading = true;
        const newWebHook = new WebHook();
        newWebHook.name = 'Prayers Agelgel Hook';
        newWebHook.API_KEY = message_port.api_key;
        newWebHook.sms_port_id = message_port.sms_port_id;
        newWebHook.action_url = 'https://api.prayers.agelgel.net/api/negarit_web_hook';
        // newWebHook.action_url = 'http://3c766e68.ngrok.io/api/negarit_web_hook';
        this.messagePortService.sendWebHook(newWebHook).subscribe(
            data => {
                console.log('Negarit-Webhook', data);
                message_port.is_connected = true;
                this.messagePortService.updateMessagePort(message_port).subscribe(
                    new_data => {console.log('port-update', new_data)},
                    new_error => {console.log('port-update', new_error)}
                );
                this.loading = false;
            }, error => {
                console.log('Negarit-Webhook', error);
                this.loading = false;
            }
        );
    }
}
