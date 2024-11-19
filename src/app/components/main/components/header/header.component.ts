import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit{

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
      
    }

    logout() {
      this.authService.logout();
    }
}
