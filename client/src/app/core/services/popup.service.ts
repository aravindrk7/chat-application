import { Injectable } from '@angular/core';
import { Popper } from '../../shared/components/popup/popper';
import { Popup } from '../../shared/components/popup/popup';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public popper = new Popper();
  pops(message: any, heading: string, type: string, icon: string): void {
    const popup: Popup = new Popup(message, heading, type, icon);
    this.popper.open(popup);
  }
}
