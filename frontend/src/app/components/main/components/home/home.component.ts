import { Component, OnInit } from '@angular/core';
import { RequireServerService } from '../../../../services/require-server.service';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs';
import { DEFAULT_IMG_PATH } from '../constants';
import { User } from '../../../../interfaces';
import { UserService } from '../../../../services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  imgUrl!: string | null;
  user!: User;

  defaultImgPath: string = DEFAULT_IMG_PATH

  constructor(private reqServ: RequireServerService, private authService: AuthService, private userServ: UserService) {}

  ngOnInit(): void {
    const dataUser = this.authService.getTokenData()
    this.reqServ.getUserData(dataUser[0], dataUser[1]).subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  deleteImgUser(email: string) {
    if(confirm("Удалить фотографию?")) {
        this.reqServ.deleteUserImg(email).subscribe({
        next: res => {
          this.user.img = ''
          this.userServ.clearUserPhoto();
        }
      })
    }
    }
    
}
