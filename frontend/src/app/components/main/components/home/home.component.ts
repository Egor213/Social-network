import { Component, OnInit } from '@angular/core';
import { RequireServerService } from '../../../../services/require-server.service';
import { AuthService } from '../../../../services/auth.service';
import { map } from 'rxjs';
import { DEFAULT_IMG_PATH } from '../constants';
import { User } from '../../../../interfaces';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  imgUrl!: string | null;
  username!: string;
  email!:string;
  status!: string;
  role!: string;
  date!: string;

  private defaultImgPath: string = DEFAULT_IMG_PATH

  constructor(private reqServ: RequireServerService, private authService: AuthService) {}

  ngOnInit(): void {
    const dataUser = this.authService.getTokenData()
    this.reqServ.getUserData(dataUser[0], dataUser[1]).subscribe({
      next: (user) => {
        this.setInfoUser(user);
        this.setUserPhoto(user.img);
      }
    });
  }


  setInfoUser(user: User) {
    this.username = user.name;
    this.date = user.date;
    this.email = user.email;
    this.role = user.role;
    this.status = user.status;
  }

  setUserPhoto(imgPath: string) {
    if (imgPath) {
      this.reqServ.getPhotoUser(imgPath).subscribe({
        next: (response) => {
          const url = URL.createObjectURL(response);
          this.imgUrl = url;
        },
        error: () => this.imgUrl = this.defaultImgPath
      })
    } else {
      this.imgUrl = this.defaultImgPath
    }
  }
}