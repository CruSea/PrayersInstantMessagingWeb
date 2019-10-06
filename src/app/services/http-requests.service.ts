import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {
  public root_negarit_url = 'https://api.negarit.net/api/'; // BENGEOS LOCAL SERVER
  public root_url = 'https://api.prayers.agelgel.net/'; // Agelgel Production Server


  // public root_url = 'http://127.0.0.1:8000/'; // BENGEOS Local Server
  public api_root_url = this.root_url + 'api/';

  constructor(private httpRequest: HttpClient) { }
  public sendGetRequest(routeName) {
    return this.httpRequest.get(this.api_root_url + routeName);
  }
  public sendPostRequest(routeName, body, header) {
    return this.httpRequest.post(this.api_root_url + routeName, body, header);
  }
  public sendPutRequest(routeName, body, header) {
    return this.httpRequest.put(this.api_root_url + routeName, body, header);
  }
  public sendPatchRequest(routeName, body, header) {
    return this.httpRequest.patch(this.api_root_url + routeName, body, header);
  }
  public sendDeleteRequest(routeName) {

    return this.httpRequest.delete(this.api_root_url + routeName);
  }
  public sendCustomGetRequest(full_url) {
    return this.httpRequest.get(full_url);
  }
  public sendCustomPostRequest(full_url, body, header) {
    return this.httpRequest.post(full_url, body, header);
  }
  public getRootUrl() {
    return this.root_url;
  }
  public getApiRootUrl() {
    return this.api_root_url;
  }

  public sendGetRequestToNegarit(routeName) {
    return this.httpRequest.get(this.root_negarit_url + routeName);
  }
  public sendPostRequestToNegarit(routeName, body, header) {
    return this.httpRequest.post(this.root_negarit_url + routeName, body, header);
  }
}
