import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { HomeComponent } from './components/home/home.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddNewFriendsComponent } from './components/add-new-friends/add-new-friends.component';

const routes: Routes = [
  {path:'', component: MainDashboardComponent, children: [
    {path:'news', component: NewsComponent},
    {path: 'home', component: HomeComponent},
    {path: 'friends', component: FriendsComponent},
    {path: 'user/:id', component: UserProfileComponent},
    {path: 'add_friends', component: AddNewFriendsComponent},
    {path: '', redirectTo: 'news', pathMatch: 'full'}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
