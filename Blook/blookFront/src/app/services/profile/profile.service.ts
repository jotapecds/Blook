import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiURL:string = 'http://localhost:8000/api/';

  httpHeaders: any = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  constructor(public http: HttpClient) { }

  showUser(id): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.apiURL + 'showUser/' + id, this.httpHeaders);
  }

  updateProfile(form): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.put(this.apiURL + 'updateUser', form, this.httpHeaders);
  }

  followUser(id): Observable<any> {
    this.httpHeaders.headers["Authorization"] = "Bearer " + localStorage.getItem('userToken');
    return this.http.get(this.apiURL + 'followUser/' + id, this.httpHeaders);
  }

  listUserPosts(id): Observable<any> {
    return this.http.get(this.apiURL + 'listUserPosts/' + id, this.httpHeaders);
  }

}
