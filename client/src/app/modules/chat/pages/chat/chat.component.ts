import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from 'src/app/core/services/chat.service';
import { DataService } from 'src/app/core/services/data.service';
import { PopupService } from 'src/app/core/services/popup.service';

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
  activeTab: string;
  tabList: any[];
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private router: Router,
    private dataService: DataService,
    private popupService: PopupService
  ) {

    this.userName = this.route.snapshot.queryParams.name;
    this.dataService.updatedUserData({ name: this.userName });

    this.activeTab = 'Friends'
    this.tabList = [
      {
        title: 'Friends',
        icon: 'fa fa-user'
      },
      {
        title: 'Groups',
        icon: 'fa fa-users'
      },
      {
        title: 'Calls',
        icon: 'fa fa-phone'
      },
      {
        title: 'Favourites',
        icon: 'fa fa-star'
      }

    ];

  }

  ngOnInit(): void {
    // this.dataService.userData.subscribe(userData => {
    //   this.userName = userData['name'];
    // });
    this.chatService.joinMessage(this.userName);

    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        console.log(message);
        if ((message['from'] == this.messengerData['userName']) || (message['from'] == this.userName)) {
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
      console.log(messengerData);
      this.messengerData = messengerData;
    });
  }

  sendMessage(message) {
    this.chatService.sendMessage({
      from: this.userName,
      to: this.messengerData['userName'],
      text: this.getMessage(message, 'text'),
      image: this.getMessage(message, 'image'),
      audio: this.getMessage(message, 'audio'),
      type: message['type'],
      time: new Date()
    });
  }

  getMessage(message, type) {
    return (message['type'] == type) ? message['content'] : '';
  }

  openImage(url, name) {
    fetch(url)
      .then(response => {
        return response.blob()
      })
      .then(blob => {
        this.getDataUrl(blob, name)
      });

  }
  getDataUrl(img, name) {
    let reader = new FileReader();
    reader.onload = (event) => {
      this.popupService.pops(event.target.result, name, 'image', 'fa fa-image');
    };
    reader.readAsDataURL(img);
  }

}
