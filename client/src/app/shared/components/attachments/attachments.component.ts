import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnChanges {
  @Input() messages;
  activeTab: string;
  tabList: any[];

  totalImages: number = 0;
  totalVideos: number = 0;
  totalAudios: number = 0;

  constructor() {
    this.activeTab = 'Images'
    this.tabList = [
      {
        title: 'Images',
        icon: 'fa fa-image'
      },
      {
        title: 'Videos',
        icon: 'fa fa-video'
      },
      {
        title: 'Audios',
        icon: 'fa fa-microphone'
      }
    ];
  }

  ngOnChanges(): void {
    this.totalImages = 0;
    this.totalVideos = 0;
    this.totalAudios = 0;
    console.log(this.totalImages);
    console.log(this.totalVideos);
    console.log(this.totalAudios);
    this.messages.forEach(message => {
      if (message.type == 'image') this.totalImages++;
      if (message.type == 'video') this.totalVideos++;
      if (message.type == 'audio') this.totalAudios++;
    });
  }
  switchTab(tab) {
    this.activeTab = tab;
  }
}
