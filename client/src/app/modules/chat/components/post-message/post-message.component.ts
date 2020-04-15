import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.scss']
})
export class PostMessageComponent implements OnInit {

  message: any;
  messages = [];
  letterCount: number = 0;
  @Output() msgSendEvent = new EventEmitter();
  emojiTray: boolean = false;
  emojiList: any[];
  constructor() {
    this.emojiList = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🥱', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '🤲', '👐', '🙌', '👏', '🤝', '👍', '👎', '👊', '✊', '🤛', '🤜', '🤞', '✌', '🤟', '🤘', '👌', '🤏', '👈', '👉', '👆', '👇', '☝', '✋', '🤚', '🖐', '🖖', '👋', '🤙', '💪', '🖕', '🙏', '✍', '🦾'];
  }

  ngOnInit(): void {
  }

  openEmojiTray() {
    this.emojiTray = !this.emojiTray;
  }
  addEmoji(emoji) {
    if (this.message)
      this.message += emoji;
    else this.message = emoji;
  }

  setMessage(event) {
    this.message = event.target.value;
  }

  sendMessage() {
    this.emojiTray = false;
    // let final_message = '';
    let message = this.message.trim();
    if (message == '') return null;
    // [...message].forEach(char => {
    //   this.letterCount++;
    //   if (this.letterCount > 10) {
    //     final_message += ' ';
    //     this.letterCount = 0;
    //   }
    //   else final_message += char;

    // });
    this.msgSendEvent.emit(message);
    this.message = '';
    this.letterCount = 0;
  }

}
