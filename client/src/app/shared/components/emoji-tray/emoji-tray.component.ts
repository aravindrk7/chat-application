import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmojiService } from 'src/app/core/services/emoji.service';
import { EmojiTray } from './emoji-tray';

@Component({
  selector: 'app-emoji-tray',
  templateUrl: './emoji-tray.component.html',
  styleUrls: ['./emoji-tray.component.scss']
})
export class EmojiTrayComponent implements OnInit {
  @Output() select = new EventEmitter();
  constructor(
    private emojiService: EmojiService
  ) { }

  ngOnInit(): void {
  }

  get src(): EmojiTray {
    return this.emojiService.emojiTray;
  }

  selectEmoji(emoji) {
    this.select.emit(emoji);
  }

}
