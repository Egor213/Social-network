import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { PostUser } from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  private serverUrl = 'https://localhost:3000';
  constructor() {
    this.socket = io(this.serverUrl)
  }

  sendNews(newsData: any): void {
    this.socket.emit('send_news', newsData);
  }

  getNews(userEmail: string): Observable<PostUser[]> {
    return new Observable((observer) => {
      this.socket.emit('get_news', { userEmail });
      this.socket.on('news', (data: PostUser[]) => {
        observer.next(data);  
      });
    });
  }
}
