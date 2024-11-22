import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit{

  registerForm!: FormGroup;
  emailError: boolean = false;
  dateError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      'password': new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15)
      ]),
      'date': new FormControl('', [
        Validators.required
      ]),
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['main'])
    }
  }

  submitRegister(): void {
    let date = this.registerForm.get('date')?.value
    if (date) {
      date = new Date(date)
      if (date > new Date('2020-01-01') || date < new Date('1800-01-01')) {
        this.dateError = true;
        return;
      }
    }
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.emailError = false;
        this.router.navigate(['main']);
      },
      error: (err) => {
        this.emailError = true;
      }
    });
  
  }
}
