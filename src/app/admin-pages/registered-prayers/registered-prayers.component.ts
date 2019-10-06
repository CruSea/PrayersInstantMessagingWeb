import { Component, OnInit } from '@angular/core';
import {PaginatedUsers} from '../users/users.objects';
import {PaginatedRegisteredPrayers} from './registered-prayers.objects';
import {RegisteredPrayersService} from '../services/registered-prayers.service';

@Component({
  selector: 'app-registered-prayers',
  templateUrl: './registered-prayers.component.html',
  styleUrls: ['./registered-prayers.component.scss']
})
export class RegisteredPrayersComponent implements OnInit {
  public paginated_registered_prayers: PaginatedRegisteredPrayers = new PaginatedRegisteredPrayers();
  public pageSizeOptions: number[] = [5, 10, 15, 25, 50, 100, 500, 1000];
  public loading = false;
  constructor(private prayersService: RegisteredPrayersService) { }

  ngOnInit() {
    this.updateRegisteredPrayersComponent();
    this.prayersService.PaginatedRegisteredPrayersEmitter.subscribe(
        data => {this.paginated_registered_prayers = data;}
    );
  }
  public updateRegisteredPrayersComponent() {
    this.prayersService.getPaginatedReceivedMessages();
  }
  public updatePaginatedRegisteredPrayersData(event: any) {
    this.loading = true;
    const page_num = event.pageIndex + 1;
    const paginate_size = event.pageSize;
    this.prayersService.getPaginatedReceivedMessagesData(this.paginated_registered_prayers.path + '?page=' + page_num +
        '&PAGINATE_SIZE=' + paginate_size);
  }
}
