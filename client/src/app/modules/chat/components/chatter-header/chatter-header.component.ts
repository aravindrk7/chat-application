import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { PopupService } from 'src/app/core/services/popup.service';

@Component({
  selector: 'app-chatter-header',
  templateUrl: './chatter-header.component.html',
  styleUrls: ['./chatter-header.component.scss']
})
export class ChatterHeaderComponent implements OnInit {
  messenger: string;
  str = String;
  test: any;
  constructor(
    private dataService: DataService,
    private chatService: ChatService,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    let str = 'Aravind###128512';
    this.test = str.split('###')[0] + String.fromCodePoint(Number(str.split('###')[1]))
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
  openImage(url, name) {
    fetch(url)
      .then(response => {
        return response.blob()
      })
      .then(blob => {
        this.getDataUrl(blob)
      });

  }
  getDataUrl(img) {
    // Create canvas
    let reader = new FileReader();
    reader.onload = (event) => {
      this.popupService.pops(event.target.result, name, 'image', 'fa fa-image');
    };
    reader.readAsDataURL(img);
  }
}
