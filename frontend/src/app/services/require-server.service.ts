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

  getUserData(email: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get<User>(this.apiUrl + "/api/admin/user", { params });
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
