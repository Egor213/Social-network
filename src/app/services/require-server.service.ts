import { HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces';
import { Observable } from 'rxjs';
import {registerUser} from '../interfaces'
@Injectable({
  providedIn: 'root'
})
export class RequireServerService {
  private apiUrl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl + 'admin');
  }

  getUserData(email: string, password: string): Observable<User> {
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get<User>(this.apiUrl + "admin/user", { params });
  }

  

  addUser(user: registerUser) {
    console.log(user)
    return this.http.post(this.apiUrl + "admin/create_user", user);
  }

}