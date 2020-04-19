import { Injectable } from '@angular/core';
import { EmojiTray } from 'src/app/shared/components/emoji-tray/emoji-tray';

@Injectable({
  providedIn: 'root'
})
export class EmojiService {

  constructor() { }
  public emojiTray = new EmojiTray();

  openTray(): void {
    this.emojiTray.open();
  }
  closeTray(): void {
    this.emojiTray.close();
  }

}
