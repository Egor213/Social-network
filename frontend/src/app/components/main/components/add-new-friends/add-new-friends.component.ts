import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { RequireServerService } from '../../../../services/require-server.service';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces';
import { DEFAULT_IMG_PATH } from '../constants';

@Component({
  selector: 'app-add-new-friends',
  templateUrl: './add-new-friends.component.html',
  styleUrl: './add-new-friends.component.less'
})
export class AddNewFriendsComponent implements OnInit{

  userList!: User[];
  friendsList!: User[];
  showUsersList!: User[];
  defaultImgPath: string = DEFAULT_IMG_PATH;

  constructor(
    private authServ: AuthService,
    private reqServ: RequireServerService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getAllUsers()
    this.getFriends()
    this.getshowUsers()
    
  }

  getshowUsers() {
    this.showUsersList = this.userList.filter(user => 
      !this.friendsList.some(friend => friend.id === user.id)
    );
  }


  getAllUsers() {
    this.reqServ.getAllUsers().subscribe({
      next: users => this.userList = users
    })
  }

  getFriends() {
    const dataUser = this.authServ.getTokenData()
    this.reqServ.getAllFriends(dataUser[0], dataUser[1]).subscribe({
      next: friends => this.friendsList = friends
    })
  }
}
