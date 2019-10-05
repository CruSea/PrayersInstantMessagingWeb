import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedReceivedMessage, ReceivedMessage} from '../received-messages/received-messages.objects';
import {HttpRequestsService} from '../../services/http-requests.service';
import {AuthServicesService} from '../../auth-pages/services/auth-services.service';
import {PaginatedMessagePorts, MessagePort, Campaign, SmsPort, WebHook} from '../settings/message-ports/message-ports.objects';
import {User} from '../users/users.objects';

@Injectable({
    providedIn: 'root'
})
export class MessagePortsService {
    public PaginatedMessagePortsEmitter = new EventEmitter<PaginatedMessagePorts>();
    public MessagePortListEmitter = new EventEmitter<MessagePort[]>();
    public CampaignsEmitter = new EventEmitter<Campaign[]>();
    public SmsPortsEmitter = new EventEmitter<SmsPort[]>();

    constructor(private httpService: HttpRequestsService, private authService: AuthServicesService) {
    }

    public sendWebHook(web_hook: WebHook) {
        console.log('negarit', web_hook);
        const new_header = new Headers();
        return this.httpService.sendPostRequestToNegarit('api_request/on_received_message_action', web_hook, new_header);
    }

    public getPaginatedMessagePort() {
        return this.httpService.sendGetRequest('message_ports_paginated?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedMessagePort(data);
                },
                error => {
                    console.log(error);
                },
            );
    }

    public getPaginatedMessagePortData(full_url: string) {
        return this.httpService.sendGetRequest(full_url + '?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPaginatedMessagePort(data);
                },
            );
    }

    private processGetPaginatedMessagePort(message_data) {
        if (message_data && message_data.status && message_data.result) {
            this.PaginatedMessagePortsEmitter.emit(message_data.result);
        }
    }

    public addNewMessagePort(port_data: MessagePort) {
        const new_header = new Headers();
        return this.httpService.sendPostRequest('message_port?token=' + this.authService.getUserToken(), port_data, new_header);
    }

    public updateMessage(port_data: MessagePort) {
        const new_header = new Headers();
        return this.httpService.sendPatchRequest('message_port?token=' + this.authService.getUserToken(), port_data, new_header);
    }

    public deleteMessagePort(port_data: MessagePort) {
        return this.httpService.sendDeleteRequest('message_port/' + port_data.id + '?token=' + this.authService.getUserToken());
    }
    public getCampaigns(api_key: string) {
        return this.httpService.sendGetRequestToNegarit('api_request/campaigns?API_KEY=' + api_key)
            .subscribe(
                data => {
                    this.processGetCampaigns(data);
                    console.log('success', data);
                }, error => {
                    console.log('error', error);
                }
            );
    }

    private processGetCampaigns(campaigns_data) {
        if (campaigns_data && campaigns_data.status && campaigns_data.campaigns) {
            this.CampaignsEmitter.emit(campaigns_data.campaigns);
        }
    }

    public getSmsPorts(api_key: string) {
        return this.httpService.sendGetRequestToNegarit('api_request/sms_ports?API_KEY=' + api_key)
            .subscribe(
                data => {
                    this.processGetSmsPorts(data);
                }, error => {
                    console.log('error', error);
                }
            );
    }

    private processGetSmsPorts(sms_port_data) {
        if (sms_port_data && sms_port_data.status && sms_port_data.sms_ports) {
            this.SmsPortsEmitter.emit(sms_port_data.sms_ports);
        }
    }
}
