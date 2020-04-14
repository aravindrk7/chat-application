import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge/badge.component';
import { LastseenFormatTimePipe } from './pipes/lastseen-format-time.pipe';
import { FormatTimePipe } from './pipes/format-time.pipe';



@NgModule({
  declarations: [BadgeComponent, LastseenFormatTimePipe, FormatTimePipe],
  imports: [
    CommonModule
  ],
  exports: [
    BadgeComponent,
    LastseenFormatTimePipe,
    FormatTimePipe
  ]
})
export class SharedModule { }
