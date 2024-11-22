import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequireServerService } from '../../../../services/require-server.service';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../interfaces';
import { DEFAULT_IMG_PATH } from '../constants';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.less'
})
export class UserProfileComponent implements OnInit {

  userId!: string | null;
  notFoundUser: boolean = false;
  user!: User;
  defaultImgPath: string = DEFAULT_IMG_PATH;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private reqServ: RequireServerService,
    private authServ: AuthService
  ){}

  ngOnInit(): void {
    this.userId = this.activeRoute.snapshot.paramMap.get('id')
    const userDataToken = this.authServ.getTokenData();
    this.reqServ.getUserData(userDataToken[0], userDataToken[1]).subscribe({
      next: user => {
        if (user.id == Number(this.userId)) {
          this.router.navigate(['/main/home'])
        }
      }
    })
    
    if (this.userId) {
      this.reqServ.getUserData(this.userId).subscribe({
        next: user => {
          this.user = user
        },
        error: err => {
          this.notFoundUser = true;
        }
      })
    } else {
      this.notFoundUser = true;
    }
    
  }
}
