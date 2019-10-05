import {Component, Inject, OnInit} from '@angular/core';
import {Campaign, PaginatedMessagePorts, SmsPort, MessagePort} from '../message-ports.objects';
import {MessagePortsService} from '../../../services/message-ports.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-new-message-port-dialog',
    templateUrl: './new-message-port-dialog.component.html',
    styleUrls: ['./new-message-port-dialog.component.scss']
})
export class NewMessagePortDialogComponent implements OnInit {
    public new_negarit_port: MessagePort = new MessagePort();
    public negarit_campaigns: Campaign[] = [];
    public negarit_sms_ports: SmsPort[] = [];
    public is_loading = false;

    constructor(private messagePortService: MessagePortsService, public dialogRef: MatDialogRef<NewMessagePortDialogComponent>,
                @Inject(MAT_DIALOG_DATA) new_data: MessagePort) {
    }

    ngOnInit() {
        this.messagePortService.CampaignsEmitter.subscribe(
            data => {
                this.negarit_campaigns = data;
                this.is_loading = false;
            },
            error => {
                console.log('campaigns', error);
            }
        );
        this.messagePortService.SmsPortsEmitter.subscribe(
            data => {
                this.negarit_sms_ports = data;
                this.is_loading = false;
            },
            error => {
                console.log('sms_ports', error);
            }
        );
    }

    public updateApiChanges() {
        this.is_loading = true;
        this.messagePortService.getCampaigns(this.new_negarit_port.api_key);
        this.messagePortService.getSmsPorts(this.new_negarit_port.api_key);
    }

    public addNewNegaritPort() {
        this.dialogRef.close(this.new_negarit_port);
    }

    public cancel() {
        this.dialogRef.close();
    }
}
