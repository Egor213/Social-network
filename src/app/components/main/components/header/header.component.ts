import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../../../../services/auth.service';
import { RequireServerService } from '../../../../services/require-server.service';
import { map } from 'rxjs';
import { User } from '../../../../interfaces';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit{

    constructor(private authService: AuthService, private reqServ: RequireServerService) {}

    isAdmin: boolean = false;

    ngOnInit(): void {
      const dataUser = this.authService.getTokenData()
      this.reqServ.getUserData(dataUser[0], dataUser[1]).pipe(
        map(obj => {
          return obj.role === 'Администратор'; 
        })
      ).subscribe({
        next: (isAdmin) => {
          if (isAdmin) {
            this.isAdmin = true
          }
        }
      });
    }

    OnAdminSite() {
      window.location.href = 'http://localhost:3000/'
    }

    logout() {
      this.authService.logout();
    }
}
