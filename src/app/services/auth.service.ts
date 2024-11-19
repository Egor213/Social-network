import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  
import { catchError, Observable, of, map } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { RequireServerService } from './require-server.service';
import { registerUser } from '../interfaces';
import { error } from 'console';

interface inputUser {
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
    private requireServer: RequireServerService,
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

  getTokenData(): string[] {
    const token = (this.getToken() || ' ').split('-@-')
    return token
  }

  login(inputUser: inputUser){
    return this.requireServer.getUsers().pipe(
      map(users => {
        const user = users.find((obj: any) => obj.email === inputUser.email && obj.password === inputUser.password);
        if (user) {
          this.setToken(user.email + '-@-' + user.password, 600); 
          return true;
        } else {
          throw new Error('Failed Login');
        }
      })
    );
  }

  register(inputUser: registerUser) {
    return this.requireServer.addUser(inputUser).pipe(
      map(users => {
          this.setToken(inputUser.email + '-@-' + inputUser.password, 600); 
          return true;
      }),
      catchError((error) => {
        throw new Error('Failed email');
      })
    );
  }

  logout() {
    if (confirm("Logout?")) {
      this.removeToken()
      this.router.navigate(['login'])
    }
    
  }
}
