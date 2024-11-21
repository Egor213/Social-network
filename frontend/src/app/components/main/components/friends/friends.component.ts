import { Component, OnInit } from '@angular/core';
import { RequireServerService } from '../../../../services/require-server.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces';
import { DEFAULT_IMG_PATH } from '../constants';
@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.less'
})
export class FriendsComponent implements OnInit{

  friendsList!: User[];
  defaultImgPath: string = DEFAULT_IMG_PATH;

  constructor(private reqServ: RequireServerService, private authService: AuthService) {}

  

  ngOnInit(): void {
    const dataUser = this.authService.getTokenData()
    this.reqServ.getAllFriends(dataUser[0], dataUser[1]).subscribe({
      next: friends => {
        console.log(friends)
        this.friendsList = friends;
      }
    })
  }
  
  detailUser(userId: number) {
   
  }

  deleteUser(userId: number) {

  }

  setUserPhoto(imgPath: string): string {
    if (imgPath) {
      this.reqServ.getPhotoUser(imgPath).subscribe({
        next: (response) => {
          const url = URL.createObjectURL(response);
          return url;
        },
        error: () =>  DEFAULT_IMG_PATH
      })
    } 
    return DEFAULT_IMG_PATH
  }
}
