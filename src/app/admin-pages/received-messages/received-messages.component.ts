import {Component, OnInit} from '@angular/core';
import {PaginatedReceivedMessage, ReceivedMessage} from './received-messages.objects';
import {ReceivedMessagesService} from '../services/received-messages.service';

@Component({
    selector: 'app-received-messages',
    templateUrl: './received-messages.component.html',
    styleUrls: ['./received-messages.component.scss']
})
export class ReceivedMessagesComponent implements OnInit {
    public paginated_received_messages = new PaginatedReceivedMessage();
    public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
    public loading = false;

    constructor(private receivedMessagesService: ReceivedMessagesService) {
    }

    ngOnInit() {
        this.updateReceivedMessageComponent();
        this.receivedMessagesService.PaginatedReceivedMessagesEmitter.subscribe(
            data => {this.paginated_received_messages = data; }
        );
    }

    public updateReceivedMessageComponent() {
        this.receivedMessagesService.getPaginatedReceivedMessages();
    }
    public updatePaginatedReceivedMessagesData(event: any) {
        this.loading = true;
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        this.receivedMessagesService.getPaginatedReceivedMessagesData(this.paginated_received_messages.path + '?page='
            + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

}
