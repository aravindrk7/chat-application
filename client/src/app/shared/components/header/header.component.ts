import { Component, OnInit } from '@angular/core';
// import { DataService } from '../../../core/services/data.service';
// import { ChatService } from '../../../core/services/chat.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  messenger: string;
  userName: string;
  userData: Object;

  constructor(
    // private chatService: ChatService,
    // private dataService: DataService
  ) { }

  ngOnInit(): void {
    // this.dataService.userData.subscribe(userData => {
    //   this.userName = userData;
    // });
    // this.chatService.getUserData(this.userName['name']).subscribe(userData => {
    //   this.userData = userData['data']
    // });
  }

}
