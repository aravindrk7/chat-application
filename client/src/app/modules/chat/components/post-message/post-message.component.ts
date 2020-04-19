import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmojiService } from 'src/app/core/services/emoji.service';

@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.scss']
})
export class PostMessageComponent implements OnInit {

  message: any;
  @Output() msgSendEvent = new EventEmitter();
  constructor(
    private emojiService: EmojiService
  ) { }

  ngOnInit(): void {
  }

  sendText() {
    this.closeEmojiTray();
    let message = this.message.trim();
    if (message == '') return null;
    this.sendMessage({ content: message, type: 'text' });
    this.message = '';
  }

  setMessage(event) {
    this.message = event.target.value;
  }

  uploadImage(event) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event) => {
      this.sendMessage({ content: event.target.result, type: 'image' });
    };
    reader.readAsDataURL(file);
  }

  uploadAudio(event) {
    let file = event.target.files[0];
    const url = URL.createObjectURL(file);
    this.sendMessage({ content: url, type: 'audio' });
  }

  sendMessage(message) {
    this.msgSendEvent.emit(message);
  }

  openEmojiTray() {
    this.emojiService.openTray();
  }

  closeEmojiTray() {
    this.emojiService.closeTray();
  }

  addEmoji(emoji) {
    if (this.message)
      this.message += emoji;
    else this.message = emoji;
  }



}
