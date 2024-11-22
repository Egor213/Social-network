import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../../../services/socket.service';
import { AuthService } from '../../../../services/auth.service';
import { PostUser } from '../../../../interfaces';
import { DEFAULT_IMG_PATH } from '../constants';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.less']
})
export class NewsComponent implements OnInit {
  news: PostUser[] = [];
  defaultImgPath: string = DEFAULT_IMG_PATH

  constructor(private socketService: SocketService, private authServ: AuthService) {}

  ngOnInit(): void {
    const tokenData = this.authServ.getTokenData()
    this.socketService.getNews(tokenData[0]).subscribe((news: PostUser[]) => {
      this.news = news;
      console.log(news)
    }); 
  }
}
