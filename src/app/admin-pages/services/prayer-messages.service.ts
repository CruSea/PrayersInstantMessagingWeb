import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedReceivedMessage, ReceivedMessage} from '../received-messages/received-messages.objects';
import {HttpRequestsService} from '../../services/http-requests.service';
import {AuthServicesService} from '../../auth-pages/services/auth-services.service';
import {PaginatedPrayerMessages, PrayerMessage} from '../sent-prayers/sent-prayers.objects';
import {User} from '../users/users.objects';
import {RegisteredPrayerLanguage, RegisteredPrayerLocation} from '../registered-prayers/registered-prayers.objects';

@Injectable({
  providedIn: 'root'
})
export class PrayerMessagesService {
  public PaginatedPrayersMessagesEmitter = new EventEmitter<PaginatedPrayerMessages>();
  public PrayersMessagesListEmitter = new EventEmitter<PrayerMessage[]>();
  public PrayersLocationListEmitter = new EventEmitter<RegisteredPrayerLocation[]>();
  public PrayersLanguageListEmitter = new EventEmitter<RegisteredPrayerLanguage[]>();

  constructor(private httpService: HttpRequestsService, private authService: AuthServicesService) {
  }
  public getPaginatedPrayersMessages() {
    return this.httpService.sendGetRequest('prayers_messages?token=' + this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedPrayersMessages(data);
            },
            error => {
              console.log('some error', error);
            },
        );
  }

  public getPaginatedPrayersMessagesData(full_url: string) {
    return this.httpService.sendGetRequest(full_url + '?token=' + this.authService.getUserToken())
        .subscribe(
            data => {
              this.processGetPaginatedPrayersMessages(data);
            },
        );
  }

  private processGetPaginatedPrayersMessages(received_data) {
    if (received_data && received_data.status && received_data.result) {
      this.PaginatedPrayersMessagesEmitter.emit(received_data.result);
    }
  }
  public addNewPrayerMessage(prayer_message: PrayerMessage) {
    const new_header = new Headers();
    return this.httpService.sendPostRequest('prayers_message?token=' + this.authService.getUserToken(), prayer_message, new_header);
  }
  public updatePrayerMessage(prayer_message: PrayerMessage) {
    const new_header = new Headers();
    return this.httpService.sendPatchRequest('prayers_message?token=' + this.authService.getUserToken(), prayer_message, new_header);
  }
  public deleteUser(prayer_message: PrayerMessage) {
    return this.httpService.sendDeleteRequest('prayers_message/' + prayer_message.id + '?token=' + this.authService.getUserToken());
  }

    public getPrayersLocations() {
        return this.httpService.sendGetRequest('registered_prayers_location?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPrayersLocationData(data);
                },
                error => {
                    console.log('some error', error);
                },
            );
    }
    private processGetPrayersLocationData(received_data) {
        if (received_data && received_data.status && received_data.result) {
            this.PrayersLocationListEmitter.emit(received_data.result);
        }
    }

    public getPrayersLanguages() {
        return this.httpService.sendGetRequest('registered_prayers_language?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPrayersLanguageData(data);
                },
                error => {
                    console.log('some error', error);
                },
            );
    }

    private processGetPrayersLanguageData(received_data) {
        if (received_data && received_data.status && received_data.result) {
            this.PrayersLanguageListEmitter.emit(received_data.result);
        }
    }
}
