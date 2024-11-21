import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { RequireServerService } from '../../../../services/require-server.service';
import { Router } from '@angular/router';
import { User } from '../../../../interfaces';
import { DEFAULT_IMG_PATH } from '../constants';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-add-new-friends',
  templateUrl: './add-new-friends.component.html',
  styleUrl: './add-new-friends.component.less'
})
export class AddNewFriendsComponent implements OnInit{

  constructor(
    private authServ: AuthService,
    private reqServ: RequireServerService,
    private router: Router
  ){}

  userList!: User[];
  friendsList!: number[];
  showUsersList!: User[];
  defaultImgPath: string = DEFAULT_IMG_PATH;
  tokenData!: string[];

 

  ngOnInit(): void {
    this.loadData()  
  }

  getshowUsers() {
    this.showUsersList = this.userList.filter(user => 
      !this.friendsList.some(friend => friend == user.id)
    ).filter(user => user.email != this.tokenData[0])
  }

  addFriend(userId: number) {
    if (confirm("Добавить друга?")) {
      this.reqServ.addFriendUser(this.tokenData[0], userId).subscribe({
        next: () => {
          this.friendsList.push(userId);
          this.getshowUsers(); 
        }
      })
    }
  }


  loadData() {
    this.tokenData = this.authServ.getTokenData();
    forkJoin({
      users: this.reqServ.getAllUsers(),
      friends: this.reqServ.getAllFriends(this.tokenData[0], this.tokenData[1])
    }).subscribe({
      next: (data) => {
        this.userList = data.users;
        this.friendsList = Object.values(data.friends).map(user => user.id);
        this.getshowUsers(); 
      }
    });
  }

}
