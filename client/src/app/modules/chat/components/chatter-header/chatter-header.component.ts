import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chatter-header',
  templateUrl: './chatter-header.component.html',
  styleUrls: ['./chatter-header.component.scss']
})
export class ChatterHeaderComponent implements OnInit {
  messenger: string;

  constructor(
    private dataService: DataService,
    private chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.dataService.messengerData.subscribe(messengerData => {
      this.messenger = messengerData;
    });
    this.chatService
      .userLastSeen()
      .subscribe((userData: any) => {
        if (this.messenger['userName'] == userData['userName'])
          this.messenger = userData;
      });
  }

}
