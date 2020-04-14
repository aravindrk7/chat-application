import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import { DataService } from 'src/app/core/services/data.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  onlineUsersList: any = [];
  messages = [];
  userName: any;
  messengerData: any;
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private dataService: DataService) {

    this.userName = this.route.snapshot.queryParams.name;
    this.dataService.updatedUserData({ name: this.userName });
  }

  ngOnInit(): void {
    // this.dataService.userData.subscribe(userData => {
    //   this.userName = userData['name'];
    // });
    this.chatService.joinMessage(this.userName);

    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        if (message['from'] == this.messengerData['userName']) {
          this.messages.push(message);
        }
      });
    this.chatService
      .getUserMessageList()
      .subscribe((messages: any) => {
        this.messages = [];
        this.messages = messages;
      });

    this.dataService.messengerData.subscribe(messengerData => {
      this.messengerData = messengerData;
    });
  }

  sendMessage(message) {
    let time = new Date();
    this.messages.push({ from: this.userName, text: message, time: time });
    this.chatService.sendMessage({ from: this.userName, to: this.messengerData['userName'], text: message, time: time });
  }

}
