import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { ChatModule } from './modules/chat/chat.module';
import { HeaderComponent } from './core/header/header.component';
import { DataService } from './core/services/data.service';
import { RegisterComponent } from './core/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './core/login/login.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChatModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
