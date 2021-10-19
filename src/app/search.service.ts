import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  fetchUsers(searchText: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('inname', searchText);
    searchParams = searchParams.append('order', 'desc');
    searchParams = searchParams.append('sort', 'reputation');
    searchParams = searchParams.append('site', 'stackoverflow');

    return this.http
      .get<any>('https://api.stackexchange.com/2.3/users/?', {
        params: searchParams,
        responseType: 'json',
      })

      .pipe(
        map((responseData) => {
          const usersArray: any = [];
          for (const key in responseData.items) {
            usersArray.push({ ...responseData.items[key], id: key });
          }
          return usersArray;
        }),
        catchError((errorRes) => {
          return throwError(errorRes);
        })
      );
  }
}
