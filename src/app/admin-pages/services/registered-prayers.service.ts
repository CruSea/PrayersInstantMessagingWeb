import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedReceivedMessage, ReceivedMessage} from '../received-messages/received-messages.objects';
import {HttpRequestsService} from '../../services/http-requests.service';
import {AuthServicesService} from '../../auth-pages/services/auth-services.service';
import {PaginatedRegisteredPrayers} from '../registered-prayers/registered-prayers.objects';

@Injectable({
  providedIn: 'root'
})
export class RegisteredPrayersService {
  public PaginatedRegisteredPrayersEmitter = new EventEmitter<PaginatedRegisteredPrayers>();
  public RegisteredPrayersListEmitter = new EventEmitter<RegisteredPrayersService[]>();

  constructor(private httpService: HttpRequestsService, private authService: AuthServicesService) {
  }
  public getPaginatedReceivedMessages() {
    return this.httpService.sendGetRequest('registered_prayers?token=' + this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedRegisteredPrayers(data);
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
              this.processGetPaginatedRegisteredPrayers(data);
            },
        );
  }

  private processGetPaginatedRegisteredPrayers(received_data) {
    if (received_data && received_data.status && received_data.result) {
      this.PaginatedRegisteredPrayersEmitter.emit(received_data.result);
    }
  }
}
