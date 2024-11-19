import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { authGuard } from './guards/auth-active.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authDeactiveGuard } from './guards/auth-deactive.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', 
    canActivate: [authGuard],
    canDeactivate: [authDeactiveGuard],
    loadChildren: () => import('./components/main/main.module').then((m) => m.MainModule)
  },
  {path: '**', component: NotFoundComponent},
  // , canActivate: [authGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// import { CanActivateFn, Router } from '@angular/router';
// import { inject } from '@angular/core';
// import { AuthService } from './services/auth.service';

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const authService = inject(AuthService);
//   const token = authService.getToken()
//   console.log(token)
//   if (token) {
//     return true;  
//   } else {
//     router.navigate(['/login']); 
//     return false; 
//   }
// };
