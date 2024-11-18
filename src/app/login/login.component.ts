import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {
  constructor(private router: Router, private cookieService: CookieService) {
    // console.log(this.cookieService.getAll());
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
