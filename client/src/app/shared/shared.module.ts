import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge/badge.component';
import { LastseenFormatTimePipe } from './pipes/lastseen-format-time.pipe';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { PopupComponent } from './components/popup/popup.component';
import { DownloadImageComponent } from './components/download-image/download-image.component';
import { EmojiTrayComponent } from './components/emoji-tray/emoji-tray.component';
import { SearchComponent } from './components/search/search.component';
import { TabComponent } from './components/tab/tab.component';
import { UserActionItemsComponent } from './components/user-action-items/user-action-items.component';
import { AttachmentsComponent } from './components/attachments/attachments.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    BadgeComponent,
    LastseenFormatTimePipe,
    FormatTimePipe,
    PopupComponent,
    DownloadImageComponent,
    EmojiTrayComponent,
    SearchComponent,
    TabComponent,
    UserActionItemsComponent,
    AttachmentsComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BadgeComponent,
    LastseenFormatTimePipe,
    FormatTimePipe,
    PopupComponent,
    DownloadImageComponent,
    EmojiTrayComponent,
    SearchComponent,
    TabComponent,
    UserActionItemsComponent,
    AttachmentsComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
