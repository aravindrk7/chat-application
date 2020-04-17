import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-messaged-user',
  templateUrl: './messaged-user.component.html',
  styleUrls: ['./messaged-user.component.scss']
})
export class MessagedUserComponent implements OnInit {
  messengerList: any;
  userData: any;
  currentMessenger: any;
  // @Output() msgOpenEvent = new EventEmitter();
  constructor(
    private dataService: DataService,
    private chatService: ChatService,
  ) {
    this.dataService.userData.subscribe(userData => {
      this.userData = userData;
    });
  }

  ngOnInit(): void {


    this.chatService.getAllUser(this.userData['name']).subscribe(users => {
      this.messengerList = users['data'];
      this.chatService.getUserLatestMessage(this.userData['name']).subscribe(msg => {
        msg['data'].forEach(msg => {
          if (msg) {
            this.messengerList.forEach(messenger => {
              if (messenger['userName'] === msg['from']) {
                messenger['latestMessage'] = msg['text'];
                messenger['latestFile'] = msg['image'];
                messenger['time'] = msg['time'];
                return;
              }
            });
          }

        });
      });
      let params = {
        from: this.userData['name'],
        to: this.messengerList[1]['userName']
      }
      this.currentMessenger = this.messengerList[1]['userName'];
      this.chatService.getUserMessages(params);
      this.dataService.updatedCurrentMessenger(this.messengerList[1]);
    });

    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messengerList.forEach(messenger => {
          if (messenger.userName === message['from']) {
            messenger['latestMessage'] = message['text'];
            messenger['latestFile'] = message['image'];
            messenger['time'] = message['time'];
          }
        });
      });
  }
  openUserMessages(messengerData) {
    this.currentMessenger = messengerData['userName'];
    let params = {
      from: this.userData['name'],
      to: messengerData['userName']
    };
    this.chatService.getUserData(messengerData['userName']).subscribe(userData => {
      this.dataService.updatedCurrentMessenger(userData['data']);
    });
    this.chatService.getUserMessages(params);

  }

}
