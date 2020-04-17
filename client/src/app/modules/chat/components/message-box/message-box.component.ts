import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { PopupService } from 'src/app/core/services/popup.service';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnChanges {
  @Input() messages;
  @Input() user;
  @ViewChild('messageBox') messageBox: ElementRef;

  constructor(
    private popupService: PopupService
  ) { }

  ngOnChanges(): void {
    this.scrollToBottom(this.messageBox);
  }
  scrollToBottom(myScrollContainer): void {
    try {
      myScrollContainer.nativeElement.scrollTop = myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
  openImage(src, name) {
    this.popupService.pops(src, 'image from ' + name, 'image', 'fa fa-image');;
  }
}
