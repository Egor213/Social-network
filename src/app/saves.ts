
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';  

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.less']
// })
// export class AppComponent implements OnInit {
//   friends: any; 

//   constructor(private http: HttpClient) {}  

//   ngOnInit(): void {
//     this.http.get('http://localhost:3000/api/user/friends/4').subscribe(
//       (data) => {
//         this.friends = data;
//       },
//       (error) => {
//         console.error('Error fetching friends', error); 
//       }
//     );
//   }
// }


// <div *ngIf="friends">
//   <h3>Друзья:</h3>
//   <ul>
//     <li *ngFor="let friend of friends">{{ friend.name }}</li>
//   </ul>
// </div>
