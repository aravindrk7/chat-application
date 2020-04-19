import { Popup } from './popup';

export class Popper {
	data: any;
	heading: string;
	type: string;
	display: boolean = false;
	icon: any[];
	public close(): void {
		this.display = false;
	}

	public open(popup: Popup): void {
		console.log(popup);
		this.display = true;
		this.data = popup['message'];
		this.heading = popup['heading'];
		this.type = popup['type'];
		this.icon = popup['icon'];
	}
}
