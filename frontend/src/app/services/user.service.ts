import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>({});  
  user$ = this.userSubject.asObservable(); 

  constructor() {}
  updateUser(user: any) {
    this.userSubject.next(user);  
  }

  loadUserPhoto(imgPath: string) {
    const currentUser = this.userSubject.value;
    currentUser.img = imgPath;  
    this.updateUser(currentUser);  
  }

  clearUserPhoto() {
    const currentUser = this.userSubject.value;
    currentUser.img = '';  
    this.updateUser(currentUser);  
  }
}
