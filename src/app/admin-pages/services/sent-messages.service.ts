import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedReceivedMessage, ReceivedMessage} from '../received-messages/received-messages.objects';
import {PaginatedSentMessage, SentMessage} from '../sent-messages/sent-messages.objects';
import {HttpRequestsService} from '../../services/http-requests.service';
import {AuthServicesService} from '../../auth-pages/services/auth-services.service';

@Injectable({
  providedIn: 'root'
})
export class SentMessagesService {
  public PaginatedSentMessagesEmitter = new EventEmitter<PaginatedSentMessage>();
  public SentMessagesListEmitter = new EventEmitter<SentMessage[]>();
  constructor(private httpService: HttpRequestsService, private authService: AuthServicesService) { }

  public getPaginatedSentMessages() {
    return this.httpService.sendGetRequest('sent_messages_paginated?token=' + this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedSentMessages(data);
            },
            error => {
              console.log(error);
            },
        );
  }

  public getPaginatedSentMessagesData(full_url: string) {
    return this.httpService.sendGetRequest(full_url + '?token=' + this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedSentMessages(data);
            },
        );
  }

  private processGetPaginatedSentMessages(sent_data) {
    if (sent_data && sent_data.status && sent_data.result) {
      this.PaginatedSentMessagesEmitter.emit(sent_data.result);
    }
  }
}
