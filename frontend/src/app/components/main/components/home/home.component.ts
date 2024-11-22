import { Component, OnInit } from '@angular/core';
import { RequireServerService } from '../../../../services/require-server.service';
import { AuthService } from '../../../../services/auth.service';
import { DEFAULT_IMG_PATH } from '../constants';
import { SendPost, User } from '../../../../interfaces';
import { UserService } from '../../../../services/user.service';
import { SocketService } from '../../../../services/socket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.less'
})
export class HomeComponent {
  imgUrl!: string | null;
  user!: User;
  isLoad: boolean = false
  file: File | null = null; 
  fileName: string = ''
  previewUrl: string | ArrayBuffer | null = null;
  attachedImg: string = ''
  postContent: string = '';

  defaultImgPath: string = DEFAULT_IMG_PATH

  constructor(
    private reqServ: RequireServerService, 
    private authService: AuthService, 
    private userServ: UserService,
    private socketServ: SocketService
  ) {}

  ngOnInit(): void {
    const dataUser = this.authService.getTokenData()
    this.reqServ.getUserData(dataUser[0], dataUser[1]).subscribe({
      next: (user) => {
        this.user = user;
      }
    });
  }

  publishPost() {
    if (!this.postContent && !this.attachedImg) {
      alert("Напиши что-нибудь или прикрепите фотографию!")
      return;
    }
    this.postNews(this.postContent, this.attachedImg)
    this.postContent = ''
    this.attachedImg = ''
    alert("Пост опубликован!")
  }

  postNews(post: string, img?: string): void {
    const newsData: SendPost  = { id: this.user.id, post: post, email: this.user.email};
    if (img)
      newsData.photo = img
    this.socketServ.sendNews(newsData);
  }

  attachImg() {
    this.attachedImg = prompt("Введите ссылку на изображение") || ''
  }

  clearAtteched() {
    this.attachedImg = ''
  }

  loadAvatarImg(event?: Event) {
    if (event) event.preventDefault();
    if (this.file) {
      const formData = new FormData();
      formData.append('file', this.file);
      if (this.user.img)
        this.deleteImgUser()
      this.reqServ.uploadUserImg(this.user.email, formData).subscribe({
        next: (result) => {
          if ('path_img' in result) {
            this.user.img = result.path_img
            this.userServ.loadUserPhoto(result.path_img);
            this.changeLoadImg()
            this.clearFile()
          }
          else {
            console.log('ошибка установки фотографии!', result)
          }
        },
        error: err => console.log('ошибка установки фотографии!', err)
      })
    }
  }

  deleteImgUser(): boolean {
    if (!this.user.img) {
      alert('У вас нет фотографии!')
      return false;
    }
    if(confirm("Удалить старую фотографию?")) {
        this.reqServ.deleteUserImg(this.user.email).subscribe({
        next: () => {
          this.user.img = ''
          this.userServ.clearUserPhoto();
        },
        error: err => {
          console.log('Не удалось удалить фотографию:', err)
        }
      })
    }
    return true
    }

    changeLoadImg() {
      this.isLoad = !this.isLoad
    }
    
    onFileChange(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.fileName = file.name;
        this.file = file 

        const reader = new FileReader();
        reader.onload = () => {
          this.previewUrl = reader.result
        }
        reader.readAsDataURL(file);
      }
    }

    clearFile() {
      this.fileName = '';
      this.file = null;
      this.previewUrl = null
    }
    
    
}
