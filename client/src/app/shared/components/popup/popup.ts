export class Popup {

	public message: any;
	public heading: string;
	public type: string;
	// public width:string;
	// public headers:any;
	public icon: any;

	constructor(message: any, heading: string, type: string, icon: string) {
		this.message = message;
		this.heading = heading;
		this.type = type;
		// this.width = width;
		// this.headers = headers;
		this.icon = icon;
	}
}