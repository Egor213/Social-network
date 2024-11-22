import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../../../../services/auth.service';
import { RequireServerService } from '../../../../services/require-server.service';
import { map } from 'rxjs';
import { SendPost, User } from '../../../../interfaces';
import { DEFAULT_IMG_PATH } from '../constants';
import { UserService } from '../../../../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit{

    defaultImgPath: string = DEFAULT_IMG_PATH

    constructor(
      private authService: AuthService, 
      private reqServ: RequireServerService, 
      private userServ: UserService
    ) {}

    
    isAdmin: boolean = false;
    username!: string;
    user!: User;

    ngOnInit(): void {
      this.userServ.user$.subscribe(user => {
        this.user = user;
      });
      const dataUser = this.authService.getTokenData()
      this.reqServ.getUserData(dataUser[0], dataUser[1]).subscribe({
        next: (user) => {
          this.username = this.truncateString(user.name, 15)
          this.setAdmin(user.role)
          this.user = user
        }
      });
    }




    OnAdminSite() {
      window.location.href = 'http://localhost:3000/'
    }

    logout() {
      this.authService.logout();  
    }


    truncateString(str: string, length: number): string {
      if (str.length > length) {
        return str.substring(0, length) + '...';
      }
      return str;
    }

    setAdmin(role: string) {
      if (role === 'Администратор') {
        this.isAdmin = true
      }
    }

}