import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchText = '';
  userSelected = null;
  usersArray: any = [];
  isFetching = false;
  error: any = null;
  private fetchUsers!: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit() {}

  searchData(): void {
    if (this.searchText.length > 0) {
      this.isFetching = true;
      this.fetchUsers = this.searchService
        .fetchUsers(this.searchText)
        .subscribe(
          (users) => {
            this.isFetching = false;
            this.usersArray = users;
          },
          (error: { message: null }) => {
            this.isFetching = false;
            this.error = error.message;
          }
        );
    } else {
      this.isFetching = false;
      this.usersArray = [];
    }
  }

  getUserDetails(user: any) {
    this.userSelected = user;
  }

  onHandleError() {
    this.error = null;
  }

  onDetailsclose() {
    this.userSelected = null;
  }

  ngOnDestroy() {
    this.fetchUsers.unsubscribe();
  }
}
