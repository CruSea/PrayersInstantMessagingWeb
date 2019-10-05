import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedUsers, User} from '../users/users.objects';
import {PaginatedReceivedMessage, ReceivedMessage} from '../received-messages/received-messages.objects';
import {HttpRequestsService} from '../../services/http-requests.service';
import {AuthServicesService} from '../../auth-pages/services/auth-services.service';

@Injectable({
    providedIn: 'root'
})
export class ReceivedMessagesService {
    public PaginatedReceivedMessagesEmitter = new EventEmitter<PaginatedReceivedMessage>();
    public ReceivedMessagesListEmitter = new EventEmitter<ReceivedMessage[]>();

    constructor(private httpService: HttpRequestsService, private authService: AuthServicesService) {
    }
    public getPaginatedReceivedMessages() {
        return this.httpService.sendGetRequest('received_messages_paginated?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedReceivedMessages(data);
                },
                error => {
                    console.log('some error', error);
                },
            );
    }

    public getPaginatedReceivedMessagesData(full_url: string) {
        return this.httpService.sendGetRequest(full_url + '?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedReceivedMessages(data);
                },
            );
    }

    private processGetPaginatedReceivedMessages(received_data) {
        if (received_data && received_data.status && received_data.result) {
            this.PaginatedReceivedMessagesEmitter.emit(received_data.result);
        }
    }
}
