import {Component, Inject, OnInit} from '@angular/core';
import {PrayerMessage} from '../sent-prayers.objects';
import {MessagePortsService} from '../../services/message-ports.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MessagePort} from '../../settings/message-ports/message-ports.objects';
import {PrayerMessagesService} from '../../services/prayer-messages.service';
import {RegisteredPrayerLanguage, RegisteredPrayerLocation} from '../../registered-prayers/registered-prayers.objects';

@Component({
  selector: 'app-new-prayer-message-dialog',
  templateUrl: './new-prayer-message-dialog.component.html',
  styleUrls: ['./new-prayer-message-dialog.component.scss']
})
export class NewPrayerMessageDialogComponent implements OnInit {
  public new_prayer_message = new PrayerMessage();
  public message_port_list: MessagePort[] = [];
  public prayers_locations: RegisteredPrayerLocation[] = [];
  public prayers_languages: RegisteredPrayerLanguage[] = [];
  constructor(private messagePortService: MessagePortsService, public dialogRef: MatDialogRef<NewPrayerMessageDialogComponent>,
              @Inject(MAT_DIALOG_DATA) new_data: MessagePort, private prayerMessageService: PrayerMessagesService) { }

  ngOnInit() {
    this.updateApiChanges();
    this.prayerMessageService.PrayersLanguageListEmitter.subscribe(
        data => {this.prayers_languages = data;}
    );
    this.prayerMessageService.PrayersLocationListEmitter.subscribe(
        data => {this.prayers_locations = data;}
    );
    this.messagePortService.MessagePortListEmitter.subscribe(
        data => {this.message_port_list = data;}
    );
  }

  public updateApiChanges() {
    this.messagePortService.getMessagePortList();
    this.prayerMessageService.getPrayersLanguages();
    this.prayerMessageService.getPrayersLocations();
  }

  public addNewNegaritPort() {
    this.dialogRef.close(this.new_prayer_message);
  }

  public cancel() {
    this.dialogRef.close();
  }
}
