import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './pages/chat/chat.component';
import { BrowserModule } from '@angular/platform-browser';
import { ChatterHeaderComponent } from './components/chatter-header/chatter-header.component';
import { MessageBoxComponent } from './components/message-box/message-box.component';
import { PostMessageComponent } from './components/post-message/post-message.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessagedUserComponent } from './components/messaged-user/messaged-user.component';



@NgModule({
  declarations: [ChatComponent, ChatterHeaderComponent, MessageBoxComponent, PostMessageComponent, MessagedUserComponent],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule
  ]
})
export class ChatModule { }
