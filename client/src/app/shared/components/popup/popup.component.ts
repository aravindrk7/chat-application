import { Component, OnChanges, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Popper } from './popper';
import { PopupService } from 'src/app/core/services/popup.service';
@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html',
	styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnChanges {
	// tableData: any;
	constructor(private _popupService: PopupService) {
	}
	get src(): Popper {
		return this._popupService.popper;
	}

	ngOnChanges() {

		// this.tableData = this.src.data;
	}
	printImage() {
		window.print();
	}
}
