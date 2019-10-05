import {Component, Inject, OnInit} from '@angular/core';
import {Campaign, SmsPort, MessagePort} from '../message-ports.objects';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessagePortsService} from '../../../services/message-ports.service';

@Component({
  selector: 'app-update-message-port-dialog',
  templateUrl: './update-message-port-dialog.component.html',
  styleUrls: ['./update-message-port-dialog.component.scss']
})
export class UpdateMessagePortDialogComponent implements OnInit {
  public update_negarit_port: MessagePort = new MessagePort();
  public negarit_campaigns: Campaign[] = [];
  public negarit_sms_ports: SmsPort[] = [];
  public is_loading = false;
  constructor(private messagePortService: MessagePortsService, public dialogRef: MatDialogRef<UpdateMessagePortDialogComponent>,
              @Inject(MAT_DIALOG_DATA) update_data: MessagePort) {
    this.update_negarit_port = update_data;
    this.updateApiChanges();
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
    this.messagePortService.getCampaigns(this.update_negarit_port.api_key);
    this.messagePortService.getSmsPorts(this.update_negarit_port.api_key);
  }

  public addNewNegaritPort() {
    this.dialogRef.close(this.update_negarit_port);
  }

  public cancel() {
    this.dialogRef.close();
  }

}
