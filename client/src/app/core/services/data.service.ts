import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable()
export class DataService {

  private messengerDataSource = new BehaviorSubject('');
  messengerData = this.messengerDataSource.asObservable();
  private userDataSource = new BehaviorSubject('');
  userData = this.userDataSource.asObservable();

  constructor() { }

  updatedCurrentMessenger(messengerData) {
    this.messengerDataSource.next(messengerData);
  }
  updatedUserData(userData) {
    this.userDataSource.next(userData);
  }

}