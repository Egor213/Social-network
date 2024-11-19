import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { authGuard } from './auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewsComponent } from './news/news.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'news', component: NewsComponent, canActivate: [authGuard]},
  {path: '**', component: NotFoundComponent},
  // , canActivate: [authGuard]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

