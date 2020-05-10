import { Injectable } from '@angular/core';
import io from 'socket.io-client'
import { AppConstants } from './../../constants/appConstants'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  endpoint = AppConstants.getBaseURL();
  socket: any;
  constructor(private http: HttpClient) {
    this.socket = io(this.endpoint);
  }

  getAllUser(currentUser) {
    let params = {
      name: currentUser
    }
    return this.http.post(this.endpoint + '/userList', params);
  }
  getUserData(user) {
    let params = {
      name: user
    }
    return this.http.post(this.endpoint + '/userData', params);
  }
  getUserLatestMessage(user) {
    console.log("sasas");
    let params = {
      name: user
    }
    return this.http.post(this.endpoint + '/userLatestMessage', params);
  }

  joinMessage(name) {
    this.socket.emit('join', name, () => { });
  }

  getUserMessages(params) {
    this.socket.emit('getUserMessages', params);
  }

  sendMessage(targetData) {
    this.socket.emit('sendMessage', targetData);
  }

  sendFile(targetData) {
    this.socket.emit('sendFile', targetData);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('message', (message) => {
        observer.next(message);
      });
    });
  };
  public getUserMessageList = () => {
    return Observable.create((observer) => {
      this.socket.on('userMessages', (messages) => {
        observer.next(messages);
      });
    });
  };

  public userLastSeen = () => {
    return Observable.create((observer) => {
      this.socket.on('userLastSeen', (lastseen) => {
        observer.next(lastseen);
      });
    });
  };
}
