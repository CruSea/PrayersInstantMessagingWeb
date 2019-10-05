import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedUsers, User, UserRole} from '../users/users.objects';
import {AuthServicesService} from '../../auth-pages/services/auth-services.service';
import {HttpRequestsService} from '../../services/http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public PaginatedUsersEmitter = new EventEmitter<PaginatedUsers>();
  public UsersListEmitter = new EventEmitter<User[]>();
  public UserRolesListEmitter = new EventEmitter<UserRole[]>();
  constructor(private httpService: HttpRequestsService, private authService: AuthServicesService) { }

  public getUsersList() {
    return this.httpService.sendGetRequest('users?token=' + this.authService.getUserToken())
        .subscribe(
            data => { this.processGetUsersList(data); },
            error => { console.log(error); },
        );
  }
  private processGetUsersList(users_data) {
    if (users_data && users_data.status && users_data.result) {
      this.UsersListEmitter.emit(users_data.result);
    }
  }
  public getPaginatedUsers() {
    return this.httpService.sendGetRequest('users_paginated?token=' + this.authService.getUserToken())
        .subscribe(
            data => { this.processGetPaginatedUsers(data); },
            error => { console.log(error); },
        );
  }
  public getPaginatedUsersData(full_url: string) {
    return this.httpService.sendGetRequest(full_url + '?token=' + this.authService.getUserToken())
        .subscribe(
            data => { this.processGetPaginatedUsers(data); },
        );
  }
  private processGetPaginatedUsers(media_data) {
    if (media_data && media_data.status && media_data.result) {
      this.PaginatedUsersEmitter.emit(media_data.result);
    }
  }
  public addNewUser(user_data: User) {
    const new_header = new Headers();
    return this.httpService.sendPostRequest('user?token=' + this.authService.getUserToken(), user_data, new_header);
  }
  public updateUser(user_data: User) {
    const new_header = new Headers();
    return this.httpService.sendPatchRequest('user?token=' + this.authService.getUserToken(), user_data, new_header);
  }
  public changeUserStatus(user_data: User) {
    const new_header = new Headers();
    return this.httpService.sendPostRequest('user_status?token=' + this.authService.getUserToken(), user_data, new_header);
  }
  public deleteUser(user_data: User) {
    return this.httpService.sendDeleteRequest('user/' + user_data.id + '?token=' + this.authService.getUserToken());
  }
  public getUserRolesList() {
    return this.httpService.sendGetRequest('user_roles?token=' + this.authService.getUserToken())
        .subscribe(
            data => { this.processGetUserRolesList(data); },
            error => { console.log(error); },
        );
  }
  private processGetUserRolesList(user_roles_data) {
    if (user_roles_data && user_roles_data.status && user_roles_data.result) {
      this.UserRolesListEmitter.emit(user_roles_data.result);
    }
  }
}
