import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: boolean = false;  

  constructor(
    private router: Router, 
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      'password': new FormControl('', [
        Validators.required
      ])
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['main'])
    }
  }

  submitLogin(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loginError = false;
        this.router.navigate(['main']);
      },
      error: (err) => {
        this.loginError = true;  
        console.error(err.message);
      }
    });
  }
}
