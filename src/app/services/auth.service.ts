import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  
import { catchError, Observable, of, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

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
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  setToken(token: string, expiresIn: number): void {
    const expirationDate = new Date().getTime() + expiresIn * 1000; 
    const tokenData = {
      token: token,
      expiresAt: expirationDate
    };
    this.cookieService.set('auth_token', JSON.stringify(tokenData), expiresIn); 
}

getToken(): string | null {
    const tokenData = JSON.parse(this.cookieService.get('auth_token') || 'null');
    if (tokenData && tokenData.expiresAt > new Date().getTime()) {
      return tokenData.token;
    } else {
      this.removeToken();
      return null;
    }
}

removeToken(): void {
  this.cookieService.delete('auth_token');
}


  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getUserData(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Ошибка при получении данных пользователя:', error);
        return of([]);
      })
    );
  }

  // Логин с проверкой данных
  login(inputUser: User): Observable<boolean> {
    return this.getUserData().pipe(
      map(users => {
        const user = users.find((obj: any) => obj.email === inputUser.email && obj.password === inputUser.password);
        if (user) {
          this.setToken(user.email + '-@-' + user.password, 600); 
          return true;
        } else {
          throw new Error('Failed Login');
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
