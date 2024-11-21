import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../../../../services/auth.service';
import { RequireServerService } from '../../../../services/require-server.service';
import { map } from 'rxjs';
import { User } from '../../../../interfaces';
import { DEFAULT_IMG_PATH } from '../constants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit{

    private defaultImgPath: string = DEFAULT_IMG_PATH

    constructor(private authService: AuthService, private reqServ: RequireServerService) {}

    isAdmin: boolean = false;
    username!: string;
    imgUrl!: string | null;

    ngOnInit(): void {
      const dataUser = this.authService.getTokenData()
      this.reqServ.getUserData(dataUser[0], dataUser[1]).pipe(
        map(obj => {
          return obj; 
        })
      ).subscribe({
        next: (user) => {
          this.username = this.truncateString(user.name, 15)
          this.setAdmin(user.role)
          this.setUserPhoto(user.img);
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

    setUserPhoto(imgPath: string) {
      if (imgPath) {
        this.reqServ.getPhotoUser(imgPath).subscribe({
          next: (response) => {
            const url = URL.createObjectURL(response);
            this.imgUrl = url;
          },
          error: () => this.imgUrl = this.defaultImgPath
        })
      } else {
        this.imgUrl = this.defaultImgPath
      }
    }
}