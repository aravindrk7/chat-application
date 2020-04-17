import { Popup } from './popup';

export class Popper {
	data: any;
	heading: string;
	type: string;
	// width: string;
	display: boolean = false;
	// headers: any[];
	icon: any[];
	public close(): void {
		this.display = false;
	}

	public open(popup: Popup): void {
		console.log(popup);
		// let headers = [];
		this.display = true;
		this.data = popup['message'];
		this.heading = popup['heading'];
		this.type = popup['type'];
		// this.width = popup['width'];
		// this.headers = popup['headers'];
		this.icon = popup['icon'];
	}
}
