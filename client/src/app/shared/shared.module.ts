import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge/badge.component';
import { LastseenFormatTimePipe } from './pipes/lastseen-format-time.pipe';
import { FormatTimePipe } from './pipes/format-time.pipe';
import { PopupComponent } from './components/popup/popup.component';
import { DownloadImageComponent } from './components/download-image/download-image.component';



@NgModule({
  declarations: [BadgeComponent, LastseenFormatTimePipe, FormatTimePipe, PopupComponent, DownloadImageComponent],
  imports: [
    CommonModule
  ],
  exports: [
    BadgeComponent,
    LastseenFormatTimePipe,
    FormatTimePipe,
    PopupComponent,
    DownloadImageComponent
  ]
})
export class SharedModule { }
