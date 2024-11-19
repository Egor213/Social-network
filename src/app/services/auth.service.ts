import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';  
import { catchError, Observable, of, throwError } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/admin';
  userData: any;

  constructor(
    private router: Router, 
    private cookieService: CookieService, 
    private http: HttpClient
  ) {}

  setToken(token: string): void {
    this.cookieService.set('auth_token', token);
  }

  getToken(): string {
    return this.cookieService.get('auth_token');
  }

  removeToken(): void {
    this.cookieService.delete('auth_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }

  // Используем RxJS оператор для получения данных
  getUserData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Ошибка при получении данных пользователя:', error);
        return of([]); // Возвращаем пустой массив в случае ошибки
      })
    );
  }

  login(inputUser: User): Observable<string | boolean> {
    return new Observable(observer => {
      this.getUserData().subscribe(users => {
        const user = users.find((obj: any) => obj.email === inputUser.email && obj.password === inputUser.password);
        if (user) {
          this.setToken(user.email + '-' + user.password);
          observer.next(true);
        } else {
          observer.error(new Error('Failed Login'));
        }
      });
    });
  }
}
