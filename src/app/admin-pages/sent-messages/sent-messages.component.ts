import { Component, OnInit } from '@angular/core';
import {PaginatedReceivedMessage} from '../received-messages/received-messages.objects';
import {SentMessagesService} from '../services/sent-messages.service';

@Component({
  selector: 'app-sent-messages',
  templateUrl: './sent-messages.component.html',
  styleUrls: ['./sent-messages.component.scss']
})
export class SentMessagesComponent implements OnInit {
  public paginated_sent_messages = new PaginatedReceivedMessage();
  public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
  public loading = false;
  constructor(private sentMessagesService: SentMessagesService) { }

  ngOnInit() {
  }

  public updatePaginatedSentMessagesData(event: any) {
    this.loading = true;
    const page_num = event.pageIndex + 1;
    const paginate_size = event.pageSize;
    this.sentMessagesService.getPaginatedSentMessagesData(this.paginated_sent_messages.path + '?page='
        + page_num + '&PAGINATE_SIZE=' + paginate_size);
  }
}
