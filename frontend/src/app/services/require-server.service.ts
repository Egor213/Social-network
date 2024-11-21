import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import {registerUser} from '../interfaces'
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequireServerService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + '/api/admin');
  }

  getUserData(email: string, password: string): Observable<User>;
  getUserData(userId: string): Observable<User>;
  getUserData(param1: string, param2?: string): Observable<User> {
    if (param2) {
      const params = new HttpParams()
        .set('email', param1)
        .set('password', param2);
      return this.http.get<User>(this.apiUrl + "/api/admin/user", { params });
    } else {
      console.log(this.apiUrl + "/api/admin/get_info_user/" + param1)
      return this.http.get<User>(this.apiUrl + "/api/user/get_info_user/" + param1);
    }
  }
  addUser(user: registerUser) {
    return this.http.post(this.apiUrl + "/api/admin/create_user", user);
  }

  getPhotoUser(path: string) {
    return this.http.get(this.apiUrl + path, { responseType: 'blob' });
  }


  getAllFriends(email: string, password: string){
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get<User[]>(this.apiUrl + "/api/user/friends", { params });
  }
}
