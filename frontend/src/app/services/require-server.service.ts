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

  deleteFriendUser(email: string, id_delete: number) {
    const params = new HttpParams()
        .set('email', email)
        .set('id', id_delete.toString());
    return this.http.put(this.apiUrl + '/api/user/delete_friend/', null, { params });
  }

  addFriendUser(email: string, id_delete: number) {
    const params = new HttpParams()
        .set('email', email)
        .set('id', id_delete.toString());
    return this.http.put(this.apiUrl + '/api/user/add_friend/', null, { params });
  }

  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl + '/api/admin/')
  }

  deleteUserImg(email: string) {
    const params = new HttpParams()
        .set('email', email)
    return this.http.post(this.apiUrl + '/api/user/delete_img/', null, { params })
  }


  getAllFriends(email: string, password: string){
    const params = new HttpParams()
      .set('email', email)
      .set('password', password);
    return this.http.get<User[]>(this.apiUrl + "/api/user/friends", { params });
  }

  uploadUserImg(email: string, formData: FormData) {
    const params = new HttpParams().set('email', email);
    return this.http.post<any>(this.apiUrl + '/api/user/upload_img', formData, { params });
  }
}
