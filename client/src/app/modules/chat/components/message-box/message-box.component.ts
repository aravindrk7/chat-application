import { Component, OnInit, Input, ElementRef, ViewChild, OnChanges } from '@angular/core';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBoxComponent implements OnChanges {
  @Input() messages;
  @Input() user;
  @ViewChild('messageBox') messageBox: ElementRef;

  constructor() { }

  ngOnChanges(): void {
    this.scrollToBottom(this.messageBox);
  }
  scrollToBottom(myScrollContainer): void {
    try {
      myScrollContainer.nativeElement.scrollTop = myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}
