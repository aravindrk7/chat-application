import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Input() list: any[];
  @Input() active: string;
  @Output() setActiveTab = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
  }
  switchTab(tab) {
    // this.active = title;
    this.setActiveTab.emit(tab);
  }

}
