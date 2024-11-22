import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { FriendsComponent } from './components/friends/friends.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AddNewFriendsComponent } from './components/add-new-friends/add-new-friends.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NewsComponent,
    MainDashboardComponent, 
    FriendsComponent,
    UserProfileComponent,
    AddNewFriendsComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule
  ]
})
export class MainModule { }
